import { Marker, Popup } from 'react-map-gl'
import { useState } from 'react'
import useMapStore from '../../stores/mapStore'

export default function CourtMarker({ court }) {
  const [showPopup, setShowPopup] = useState(false)
  const { selectCourt, selectedCourt } = useMapStore()
  const isSelected = selectedCourt?.courtId === court.courtId

  return (
    <>
      <Marker longitude={court.longitude} latitude={court.latitude} anchor="center">
        <button
          onClick={() => { selectCourt(court); setShowPopup(false) }}
          onMouseEnter={() => setShowPopup(true)}
          onMouseLeave={() => setShowPopup(false)}
          className="flex items-center justify-center w-7 h-7 rounded-full transition-transform hover:scale-125"
          style={{
            background: isSelected ? '#4ade80' : '#22c55e',
            border: `2px solid ${isSelected ? '#fff' : '#16a34a'}`,
            boxShadow: isSelected ? '0 0 0 3px rgba(74,222,128,0.4)' : '0 2px 6px rgba(0,0,0,0.5)',
          }}
        >
          <span style={{ fontSize: 13 }}>🎾</span>
        </button>
      </Marker>

      {showPopup && (
        <Popup
          longitude={court.longitude}
          latitude={court.latitude}
          anchor="bottom"
          offset={18}
          closeButton={false}
          closeOnClick={false}
        >
          <p className="font-semibold text-sm">{court.courtName}</p>
          <p className="text-gray-400 text-xs mt-0.5">{court.city}, {court.stateCode}</p>
        </Popup>
      )}
    </>
  )
}
