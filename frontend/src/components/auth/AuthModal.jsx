import { useState } from 'react'
import { X } from 'lucide-react'
import { signIn, signUp } from '../../api/auth'
import useAuthStore from '../../stores/authStore'

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '', passwordCheck: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const setAuth = useAuthStore((s) => s.setAuth)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        const res = await signIn(form.email, form.password)
        setAuth(res.data.data.user, res.data.data.token)
        onClose()
      } else {
        await signUp(form.name, form.email, form.password, form.passwordCheck)
        setMode('login')
        setError('Registration successful! Please log in.')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm mx-4 bg-surface-800 border border-border rounded-2xl p-6 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">🎾</span>
          <h2 className="text-lg font-semibold">{mode === 'login' ? 'Sign In' : 'Create Account'}</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'register' && (
            <input
              className="w-full bg-surface-700 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
              placeholder="Display name"
              value={form.name}
              onChange={set('name')}
              required
            />
          )}
          <input
            className="w-full bg-surface-700 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={set('email')}
            required
          />
          <input
            className="w-full bg-surface-700 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={set('password')}
            required
          />
          {mode === 'register' && (
            <input
              className="w-full bg-surface-700 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
              type="password"
              placeholder="Confirm password"
              value={form.passwordCheck}
              onChange={set('passwordCheck')}
              required
            />
          )}

          {error && (
            <p className={`text-xs ${error.includes('successful') ? 'text-accent' : 'text-red-400'}`}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-gray-900 font-semibold rounded-lg py-2 text-sm hover:bg-green-300 transition disabled:opacity-50"
          >
            {loading ? '...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            className="text-accent hover:underline"
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}
