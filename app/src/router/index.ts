import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/Accounts/MainSignin.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/Accounts/MainSignup.vue'),
    },
  ],
})

export default router
