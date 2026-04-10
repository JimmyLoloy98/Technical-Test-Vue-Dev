<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'confirm'): void
}>()
</script>

<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle class="text-xl font-bold text-red-600">Confirmar eliminación</DialogTitle>
        <DialogDescription class="mt-2 text-base">
          ¿Estás seguro de que quieres eliminar este usuario? Esta acción no se puede deshacer.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="flex gap-2 justify-end mt-6">
        <Button variant="outline" @click="$emit('update:open', false)">Cancelar</Button>
        <Button class="bg-red-600 hover:bg-red-700 text-white" @click="emit('confirm'); emit('update:open', false)">Eliminar usuario</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
