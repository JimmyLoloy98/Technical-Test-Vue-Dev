import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchUsers as fetchUsersApi } from '@/services/usersService'

export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
}

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchUsers = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await fetchUsersApi()
      users.value = data.map((u: any) => ({
        id: u.id,
        name: u.name,
        username: u.username,
        email: u.email,
        phone: u.phone
      }))
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  const addUser = (user: Omit<User, 'id'>) => {
    const nextId = users.value.length > 0 ? Math.max(...users.value.map(u => u.id)) + 1 : 1
    users.value.push({ ...user, id: nextId })
  }

  const updateUser = (id: number, updatedData: Partial<Omit<User, 'id'>>) => {
    const index = users.value.findIndex(u => u.id === id)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...updatedData }
    }
  }

  const deleteUser = (id: number) => {
    users.value = users.value.filter(u => u.id !== id)
  }

  return {
    users,
    loading,
    error,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser
  }
})
