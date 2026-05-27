import { useRef, useCallback } from 'react'
import Map from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import useMapStore from '../../stores/mapStore'
import CourtMarker from './CourtMarker'

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

export default function MapView() {
  const { courts, selectedCourt, setMapRef } = useMapStore()
  const mapRef = useRef(null)

  const onLoad = useCallback(() => {
    setMapRef(mapRef.current)
  }, [setMapRef])

  return (
    <Map
      ref={mapRef}
      onLoad={onLoad}
      mapboxAccessToken={TOKEN}
      initialViewState={{ longitude: -121.999, latitude: 37.512, zoom: 11 }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
    >
      {courts.map((court) => (
        <CourtMarker key={court.courtId} court={court} />
      ))}
    </Map>
  )
}
