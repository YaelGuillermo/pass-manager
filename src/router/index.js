import { createRouter, createWebHistory } from 'vue-router'
import PasswordForm from '@/views/PasswordForm.vue'
import UserForm from '@/views/UserForm.vue'

const routes = [
  {
    path: '/',
    redirect: '/user'
  },
  {
    path: '/user',
    name: 'UserForm',
    component: UserForm
  },
  {
    path: '/password',
    name: 'PasswordForm',
    component: PasswordForm
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

