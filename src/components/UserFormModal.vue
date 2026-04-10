<script setup lang="ts">
import { ref, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const props = defineProps<{
  open: boolean
  user?: any
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'save', user: any): void
}>()

const state = ref({
  name: '',
  username: '',
  email: '',
  phone: ''
})

const rules = {
  name: { required, minLength: minLength(3) },
  username: { required, minLength: minLength(3) },
  email: { required, email },
  phone: { required }
}

const v$ = useVuelidate(rules, state)

watch(() => props.open, (newVal) => {
  if (newVal) {
    if (props.user) {
      state.value = { ...props.user }
    } else {
      state.value = { name: '', username: '', email: '', phone: '' }
    }
    v$.value.$reset()
  }
})

const handleSave = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return
  emit('save', { ...state.value })
  emit('update:open', false)
}
</script>

<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle class="text-xl font-bold">{{ user ? 'Editar Usuario' : 'Agregar Nuevo Usuario' }}</DialogTitle>
        <DialogDescription>
          {{ user ? 'Realiza cambios en el usuario. Haz clic en "Guardar cambios" cuando hayas terminado.' : 'Introduce los datos del usuario.' }}
        </DialogDescription>
      </DialogHeader>
      <div class="grid py-4 gap-2">
        <div class="grid gap-2">
          <Label for="name" class="font-semibold">Nombre</Label>
          <Input id="name" v-model="state.name" placeholder="John Doe" />
          <span v-if="v$.name.$error" class="text-xs text-red-500 -mt-1">{{ v$.name.$errors[0].$message }}</span>
        </div>
        <div class="grid gap-2 mt-2">
          <Label for="username" class="font-semibold">Usuario</Label>
          <Input id="username" v-model="state.username" placeholder="johndoe" />
          <span v-if="v$.username.$error" class="text-xs text-red-500 -mt-1">{{ v$.username.$errors[0].$message }}</span>
        </div>
        <div class="grid gap-2 mt-2">
          <Label for="email" class="font-semibold">Correo electrónico</Label>
          <Input id="email" v-model="state.email" type="email" placeholder="john@example.com" />
          <span v-if="v$.email.$error" class="text-xs text-red-500 -mt-1">{{ v$.email.$errors[0].$message }}</span>
        </div>
         <div class="grid gap-2 mt-2">
          <Label for="phone" class="font-semibold">Teléfono</Label>
          <Input id="phone" v-model="state.phone" placeholder="1-123-456-7890" />
          <span v-if="v$.phone.$error" class="text-xs text-red-500 -mt-1">{{ v$.phone.$errors[0].$message }}</span>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" @click="$emit('update:open', false)">Cancelar</Button>
        <Button @click="handleSave">Guardar cambios</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
