import api from './axios'

export const getCourts = () => api.get('/courts')
export const getCourt = (courtId, page = 1) =>
  api.get(`/courts/${courtId}`, { params: { page } })
export const getNearbyCourts = (latitude, longitude, radius = 10) =>
  api.get('/courts/nearby', { params: { latitude, longitude, radius } })
export const searchCourts = (params) => api.get('/courts/search', { params })
export const getCourtsByMap = (minLat, maxLat, minLng, maxLng) =>
  api.get('/courts/map', { params: { minLat, maxLat, minLng, maxLng } })
