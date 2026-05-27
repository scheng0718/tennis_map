import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'

export default function App() {
  return (
    <div className="flex flex-col h-screen bg-surface-900 text-white overflow-hidden">
      <Navbar />
      <HomePage />
    </div>
  )
}
