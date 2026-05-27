import { useEffect, useState } from 'react'
import { ArrowLeft, MapPin, Phone, Tag, Navigation, Loader2 } from 'lucide-react'
import { getCourt } from '../../api/courts'
import useMapStore from '../../stores/mapStore'
import FavoriteButton from './FavoriteButton'
import CommentSection from './CommentSection'

export default function CourtDetail() {
  const { selectedCourt, deselectCourt, mapRef } = useMapStore()
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!selectedCourt) return
    setDetail(null)
    setLoading(true)
    getCourt(selectedCourt.courtId)
      .then((res) => setDetail(res.data.data.tennisCourt))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [selectedCourt?.courtId])

  function handleNavigate() {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedCourt.latitude},${selectedCourt.longitude}`
    window.open(url, '_blank')
  }

  function handleFlyTo() {
    mapRef?.flyTo({ center: [selectedCourt.longitude, selectedCourt.latitude], zoom: 15, duration: 800 })
  }

  const court = detail || selectedCourt

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border shrink-0">
        <button
          onClick={deselectCourt}
          className="p-1.5 rounded-lg hover:bg-surface-600 text-gray-400 hover:text-white transition"
        >
          <ArrowLeft size={16} />
        </button>
        <h2 className="flex-1 font-semibold text-sm text-white truncate">{court.courtName}</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {loading && (
          <div className="flex justify-center py-6">
            <Loader2 size={20} className="animate-spin text-accent" />
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-start gap-2 text-sm text-gray-300">
            <MapPin size={14} className="text-accent mt-0.5 shrink-0" />
            <span>{court.fullAddress || [court.houseNumber, court.street, court.city, court.stateCode].filter(Boolean).join(', ')}</span>
          </div>
          {court.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Phone size={14} className="text-accent shrink-0" />
              <span>{court.phone}</span>
            </div>
          )}
          {court.Type && (
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Tag size={14} className="text-accent shrink-0" />
              <span>{court.Type.type} court</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <FavoriteButton court={court} favoritedUsers={detail?.FavoritedUsers || []} />
          <button
            onClick={handleFlyTo}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-border text-gray-400 hover:border-gray-500 hover:text-white transition"
          >
            <MapPin size={13} /> Zoom in
          </button>
          <button
            onClick={handleNavigate}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-border text-gray-400 hover:border-gray-500 hover:text-white transition"
          >
            <Navigation size={13} /> Directions
          </button>
        </div>

        <div className="border-t border-border pt-4">
          <CommentSection courtId={court.courtId} />
        </div>
      </div>
    </div>
  )
}
