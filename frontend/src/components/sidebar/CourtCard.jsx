import { MapPin, Phone } from 'lucide-react'
import useMapStore from '../../stores/mapStore'

export default function CourtCard({ court }) {
  const { selectCourt, selectedCourt, mapRef } = useMapStore()
  const isSelected = selectedCourt?.courtId === court.courtId

  function handleClick() {
    selectCourt(court)
    mapRef?.flyTo({ center: [court.longitude, court.latitude], zoom: 14, duration: 800 })
  }

  return (
    <button
      onClick={handleClick}
      className={`w-full text-left p-3 rounded-xl border transition-all ${
        isSelected
          ? 'bg-surface-600 border-accent/50'
          : 'bg-surface-800 border-border hover:bg-surface-700 hover:border-gray-500'
      }`}
    >
      <div className="flex items-start gap-2">
        <div
          className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0"
          style={{ background: isSelected ? '#4ade80' : '#22c55e33', border: '1px solid #22c55e55' }}
        >
          <span style={{ fontSize: 11 }}>🎾</span>
        </div>
        <div className="min-w-0">
          <p className={`font-medium text-sm truncate ${isSelected ? 'text-accent' : 'text-white'}`}>
            {court.courtName}
          </p>
          <div className="flex items-center gap-1 mt-0.5 text-gray-400 text-xs">
            <MapPin size={11} />
            <span className="truncate">{court.city}, {court.stateCode} {court.postalCode}</span>
          </div>
          {court.phone && (
            <div className="flex items-center gap-1 mt-0.5 text-gray-500 text-xs">
              <Phone size={11} />
              <span>{court.phone}</span>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
