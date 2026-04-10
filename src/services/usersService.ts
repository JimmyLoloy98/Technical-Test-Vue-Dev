import { API_URL } from '@/config'

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`)
  if (!response.ok) {
    throw new Error('Falló la petición de usuarios')
  }
  return response.json()
}