import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '@/views/UsersView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'users',
      component: UsersView
    }
  ]
})

export default router
