import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem('tennis-auth')
  const token = raw ? JSON.parse(raw)?.state?.token : null
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
