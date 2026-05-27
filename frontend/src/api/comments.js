import api from './axios'

export const getComments = (courtId, page = 1) =>
  api.get(`/comments/${courtId}`, { params: { page } })
export const createComment = (courtId, comment) =>
  api.post(`/comments/${courtId}`, { comment })
export const updateComment = (commentId, comment) =>
  api.put(`/comments/${commentId}`, { comment })
export const deleteComment = (commentId) => api.delete(`/comments/${commentId}`)
