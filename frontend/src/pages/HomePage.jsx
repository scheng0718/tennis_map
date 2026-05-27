import MapView from '../components/map/MapView'
import Sidebar from '../components/sidebar/Sidebar'

export default function HomePage() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar />
      <main className="flex-1 relative">
        <MapView />
      </main>
    </div>
  )
}
