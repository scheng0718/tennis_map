import { useEffect, useState } from 'react'
import { Loader2, MapPin, Search } from 'lucide-react'
import { getCourts, getNearbyCourts, searchCourts } from '../../api/courts'
import { getFavorites } from '../../api/favorites'
import useMapStore from '../../stores/mapStore'
import useAuthStore from '../../stores/authStore'
import CourtCard from './CourtCard'

export default function CourtList({ activeTab }) {
  const { courts, setCourts } = useMapStore()
  const { token } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState({ cityName: '', stateCode: '', postalCode: '' })

  useEffect(() => {
    if (!token) return
    if (activeTab === 'nearby') loadNearby()
    if (activeTab === 'all') loadAll()
    if (activeTab === 'favorites') loadFavorites()
  }, [activeTab, token])

  async function loadAll() {
    setLoading(true); setError('')
    try {
      const res = await getCourts()
      setCourts(res.data.data)
    } catch { setError('Failed to load courts') }
    finally { setLoading(false) }
  }

  async function loadNearby() {
    setLoading(true); setError('')
    if (!navigator.geolocation) { setError('Geolocation not supported'); setLoading(false); return }
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await getNearbyCourts(coords.latitude, coords.longitude, 10)
          setCourts(res.data.data.tennisCourts)
        } catch { setError('Failed to load nearby courts') }
        finally { setLoading(false) }
      },
      () => { setError('Location access denied — showing all courts'); loadAll() }
    )
  }

  async function loadFavorites() {
    setLoading(true); setError('')
    try {
      const res = await getFavorites()
      const courts = res.data.data.favorites.map((f) => f.TennisCourt).filter(Boolean)
      setCourts(courts)
    } catch { setError('Failed to load favorites') }
    finally { setLoading(false) }
  }

  async function handleSearch(e) {
    e.preventDefault()
    if (!search.cityName && !search.stateCode && !search.postalCode) return
    setLoading(true); setError('')
    try {
      const res = await searchCourts(search)
      setCourts(res.data.data.tennisCourts)
    } catch { setError('Search failed') }
    finally { setLoading(false) }
  }

  const set = (k) => (e) => setSearch((s) => ({ ...s, [k]: e.target.value }))

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {activeTab === 'search' && (
        <form onSubmit={handleSearch} className="px-3 pb-3 space-y-2">
          <input
            className="w-full bg-surface-700 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-accent placeholder-gray-500"
            placeholder="City name"
            value={search.cityName}
            onChange={set('cityName')}
          />
          <div className="flex gap-2">
            <input
              className="w-1/2 bg-surface-700 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-accent placeholder-gray-500"
              placeholder="State (e.g. CA)"
              value={search.stateCode}
              onChange={set('stateCode')}
            />
            <input
              className="w-1/2 bg-surface-700 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-accent placeholder-gray-500"
              placeholder="Zip code"
              value={search.postalCode}
              onChange={set('postalCode')}
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-accent text-gray-900 font-semibold rounded-lg py-2 text-sm hover:bg-green-300 transition"
          >
            <Search size={14} /> Search
          </button>
        </form>
      )}

      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 size={20} className="animate-spin text-accent" />
        </div>
      )}

      {error && <p className="text-xs text-red-400 px-3 pb-2">{error}</p>}

      {!loading && courts.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <MapPin size={28} className="mb-2" />
          <p className="text-sm">No courts found</p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2">
        {courts.map((court) => (
          <CourtCard key={court.courtId} court={court} />
        ))}
      </div>
    </div>
  )
}
