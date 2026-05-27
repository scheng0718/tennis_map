import { useState } from 'react'
import { Heart } from 'lucide-react'
import { addFavorite, removeFavorite } from '../../api/favorites'
import useAuthStore from '../../stores/authStore'

export default function FavoriteButton({ court, favoritedUsers = [] }) {
  const { user } = useAuthStore()
  const isFav = favoritedUsers.some((u) => u.userId === user?.userId)
  const [favorited, setFavorited] = useState(isFav)
  const [loading, setLoading] = useState(false)

  async function toggle() {
    if (!user) return
    setLoading(true)
    try {
      if (favorited) {
        await removeFavorite(court.courtId)
        setFavorited(false)
      } else {
        await addFavorite(court.courtId)
        setFavorited(true)
      }
    } catch (_) {}
    finally { setLoading(false) }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading || !user}
      title={user ? (favorited ? 'Remove from favorites' : 'Add to favorites') : 'Sign in to favorite'}
      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition ${
        favorited
          ? 'bg-red-500/10 border-red-500/40 text-red-400 hover:bg-red-500/20'
          : 'border-border text-gray-400 hover:border-gray-500 hover:text-white'
      } disabled:opacity-40`}
    >
      <Heart size={13} fill={favorited ? 'currentColor' : 'none'} />
      {favorited ? 'Saved' : 'Save'}
    </button>
  )
}
