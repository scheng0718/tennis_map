import api from './axios'

export const getFavorites = () => api.get('/favorites')
export const addFavorite = (courtId) => api.post(`/favorites/${courtId}`)
export const removeFavorite = (courtId) => api.delete(`/favorites/${courtId}`)
