import { MapPin, Search, Heart, List } from 'lucide-react'
import useMapStore from '../../stores/mapStore'
import useAuthStore from '../../stores/authStore'
import CourtList from './CourtList'
import CourtDetail from '../court/CourtDetail'

const TABS = [
  { id: 'nearby', icon: MapPin, label: 'Nearby' },
  { id: 'all', icon: List, label: 'All' },
  { id: 'search', icon: Search, label: 'Search' },
  { id: 'favorites', icon: Heart, label: 'Saved' },
]

export default function Sidebar() {
  const { activeTab, setActiveTab, selectedCourt } = useMapStore()
  const { token } = useAuthStore()

  return (
    <aside className="w-80 shrink-0 flex flex-col bg-surface-900 border-r border-border overflow-hidden">
      {!token ? (
        <div className="flex flex-col items-center justify-center flex-1 px-6 text-center">
          <span className="text-4xl mb-3">🎾</span>
          <p className="text-gray-300 font-medium mb-1">Welcome to TennisMap</p>
          <p className="text-sm text-gray-500">Sign in to discover tennis courts near you.</p>
        </div>
      ) : selectedCourt ? (
        <CourtDetail />
      ) : (
        <>
          <div className="flex border-b border-border shrink-0">
            {TABS.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-xs transition ${
                  activeTab === id
                    ? 'text-accent border-b-2 border-accent'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>

          <CourtList activeTab={activeTab} />
        </>
      )}
    </aside>
  )
}
