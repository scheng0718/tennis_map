import { useState } from 'react'
import { LogOut, User } from 'lucide-react'
import useAuthStore from '../stores/authStore'
import { signOut } from '../api/auth'
import AuthModal from './auth/AuthModal'

export default function Navbar() {
  const { user, token, clearAuth } = useAuthStore()
  const [showModal, setShowModal] = useState(false)

  async function handleSignOut() {
    try { await signOut() } catch (_) {}
    clearAuth()
  }

  return (
    <>
      <nav className="flex items-center justify-between px-4 h-14 bg-surface-900 border-b border-border shrink-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎾</span>
          <span className="font-bold text-white tracking-tight">TennisMap</span>
        </div>

        <div className="flex items-center gap-2">
          {token ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <User size={15} className="text-accent" />
                <span>{user?.name}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white border border-border rounded-lg px-3 py-1.5 hover:border-gray-500 transition"
              >
                <LogOut size={13} />
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="text-sm bg-accent text-gray-900 font-semibold rounded-lg px-4 py-1.5 hover:bg-green-300 transition"
            >
              Sign in
            </button>
          )}
        </div>
      </nav>

      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  )
}
