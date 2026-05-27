import { useState, useEffect } from 'react'
import { Send, Trash2, Pencil, X, Check, Loader2 } from 'lucide-react'
import { getComments, createComment, updateComment, deleteComment } from '../../api/comments'
import useAuthStore from '../../stores/authStore'

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function CommentSection({ courtId }) {
  const { user } = useAuthStore()
  const [comments, setComments] = useState([])
  const [text, setText] = useState('')
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchComments()
  }, [courtId])

  async function fetchComments() {
    setLoading(true)
    try {
      const res = await getComments(courtId)
      setComments(res.data.data)
    } catch (_) {}
    finally { setLoading(false) }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    setSubmitting(true)
    try {
      const res = await createComment(courtId, text.trim())
      setComments((c) => [res.data.data.comment, ...c])
      setText('')
    } catch (_) {}
    finally { setSubmitting(false) }
  }

  async function handleUpdate(commentId) {
    if (!editText.trim()) return
    try {
      await updateComment(commentId, editText.trim())
      setComments((c) => c.map((cm) =>
        cm.commentId === commentId ? { ...cm, comment: editText.trim() } : cm
      ))
      setEditId(null)
    } catch (_) {}
  }

  async function handleDelete(commentId) {
    try {
      await deleteComment(commentId)
      setComments((c) => c.filter((cm) => cm.commentId !== commentId))
    } catch (_) {}
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-300 mb-3">
        Comments {comments.length > 0 && <span className="text-gray-500">({comments.length})</span>}
      </h3>

      {user && (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            className="flex-1 bg-surface-700 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-accent placeholder-gray-500"
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            disabled={submitting || !text.trim()}
            className="p-2 bg-accent text-gray-900 rounded-lg hover:bg-green-300 transition disabled:opacity-40"
          >
            {submitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
          </button>
        </form>
      )}

      {loading && <div className="flex justify-center py-4"><Loader2 size={16} className="animate-spin text-accent" /></div>}

      <div className="space-y-3">
        {comments.map((cm) => (
          <div key={cm.commentId} className="bg-surface-700 rounded-xl p-3 border border-border">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
                  {cm.User?.name?.[0]?.toUpperCase() || '?'}
                </div>
                <span className="text-xs font-medium text-gray-300">{cm.User?.name}</span>
                <span className="text-xs text-gray-500">{timeAgo(cm.createdAt)}</span>
              </div>
              {user?.userId === cm.userId && (
                <div className="flex gap-1">
                  {editId === cm.commentId ? (
                    <>
                      <button onClick={() => handleUpdate(cm.commentId)} className="p-1 text-accent hover:text-green-300"><Check size={12} /></button>
                      <button onClick={() => setEditId(null)} className="p-1 text-gray-400 hover:text-white"><X size={12} /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { setEditId(cm.commentId); setEditText(cm.comment) }} className="p-1 text-gray-400 hover:text-white"><Pencil size={12} /></button>
                      <button onClick={() => handleDelete(cm.commentId)} className="p-1 text-gray-400 hover:text-red-400"><Trash2 size={12} /></button>
                    </>
                  )}
                </div>
              )}
            </div>

            {editId === cm.commentId ? (
              <input
                className="w-full bg-surface-600 border border-border rounded-lg px-2 py-1 text-sm outline-none focus:border-accent"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                autoFocus
              />
            ) : (
              <p className="text-sm text-gray-200">{cm.comment}</p>
            )}
          </div>
        ))}
      </div>

      {!loading && comments.length === 0 && (
        <p className="text-xs text-gray-500 text-center py-4">No comments yet. Be the first!</p>
      )}
    </div>
  )
}
