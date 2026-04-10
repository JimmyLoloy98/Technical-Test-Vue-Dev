import { API_URL } from '@/config'

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`)
  console.log(response)
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
}