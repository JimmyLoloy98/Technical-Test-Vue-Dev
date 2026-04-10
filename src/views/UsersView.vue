<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUsersStore } from '@/stores/users'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { PlusIcon, EditIcon, TrashIcon, Loader2Icon } from 'lucide-vue-next'
import UserFormModal from '@/components/UserFormModal.vue'
import DeleteConfirmModal from '@/components/DeleteConfirmModal.vue'

const usersStore = useUsersStore()

const isUserModalOpen = ref(false)
const selectedUser = ref<any>(null)

const isDeleteModalOpen = ref(false)
const userToDelete = ref<number | null>(null)

onMounted(() => {
  usersStore.fetchUsers()
})

const openAddModal = () => {
  selectedUser.value = null
  isUserModalOpen.value = true
}

const openEditModal = (user: any) => {
  selectedUser.value = user
  isUserModalOpen.value = true
}

const openDeleteModal = (id: number) => {
  userToDelete.value = id
  isDeleteModalOpen.value = true
}

const onSaveUser = (userData: any) => {
  if (selectedUser.value) {
    usersStore.updateUser(selectedUser.value.id, userData)
  } else {
    usersStore.addUser(userData)
  }
}

const onConfirmDelete = () => {
  if (userToDelete.value !== null) {
    usersStore.deleteUser(userToDelete.value)
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto p-6 md:p-10 animate-in fade-in duration-500">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-slate-900">Usuarios</h1>
        <p class="text-slate-500 mt-1">Administra tus usuarios y su información.</p>
      </div>
      <Button @click="openAddModal" class="gap-2 shadow-sm font-semibold">
        <PlusIcon class="w-4 h-4" />
        Agregar Usuario
      </Button>
    </div>

    <!-- State: Loading -->
    <div v-if="usersStore.loading" class="flex flex-col items-center justify-center p-16 bg-white rounded-xl shadow-sm border border-slate-200">
      <Loader2Icon class="w-10 h-10 animate-spin text-slate-400 mb-4" />
      <p class="text-slate-500 font-medium">Cargando usuarios...</p>
    </div>

    <!-- State: Error -->
    <div v-else-if="usersStore.error" class="p-6 bg-red-50 text-red-600 rounded-xl border border-red-200 shadow-sm">
      <p class="font-medium text-lg">Falló a cargar la lista de usuarios</p>
      <p class="text-sm mt-1">{{ usersStore.error }}</p>
    </div>

    <!-- State: Success -->
    <div v-else class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow class="bg-slate-50/80 hover:bg-slate-50/80">
            <TableHead class="font-semibold text-slate-700 w-[20%]">Nombre</TableHead>
            <TableHead class="font-semibold text-slate-700 w-[20%]">Usuario</TableHead>
            <TableHead class="font-semibold text-slate-700 w-[25%]">Correo electrónico</TableHead>
            <TableHead class="font-semibold text-slate-700 w-[20%]">Teléfono</TableHead>
            <TableHead class="text-right font-semibold text-slate-700 w-[15%]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="user in usersStore.users" :key="user.id" class="transition-colors hover:bg-slate-50/50">
            <TableCell class="font-medium">{{ user.name }}</TableCell>
            <TableCell class="text-slate-600">{{ user.username }}</TableCell>
            <TableCell class="text-slate-600">{{ user.email }}</TableCell>
            <TableCell class="text-slate-600">{{ user.phone }}</TableCell>
            <TableCell class="text-right">
              <div class="flex justify-end gap-1">
                <Button variant="ghost" size="icon" class="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors" @click="openEditModal(user)" title="Editar Usuario">
                  <EditIcon class="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" class="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors" @click="openDeleteModal(user.id)" title="Eliminar Usuario">
                  <TrashIcon class="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow v-if="usersStore.users.length === 0">
            <TableCell colspan="5" class="h-32 text-center text-slate-500">
              <div class="flex flex-col items-center justify-center">
                <p class="text-lg mb-1">No se encontró usuarios</p>
                <p class="text-sm">Agrega un nuevo usuario para comenzar.</p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <UserFormModal
      v-model:open="isUserModalOpen"
      :user="selectedUser"
      @save="onSaveUser"
    />

    <DeleteConfirmModal
      v-model:open="isDeleteModalOpen"
      @confirm="onConfirmDelete"
    />
  </div>
</template>
