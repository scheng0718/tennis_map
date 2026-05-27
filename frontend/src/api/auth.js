import api from './axios'

export const signIn = (email, password) => api.post('/signIn', { email, password })
export const signUp = (name, email, password, passwordCheck) =>
  api.post('/signUp', { name, email, password, passwordCheck })
export const signOut = () => api.post('/signOut')
