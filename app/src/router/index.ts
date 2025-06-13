import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { hideNav: true },
    },
    {
      path: '/confirmed',
      name: 'confirmation',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Accounts/EmailConfirmation.vue'),
      meta: { hideNav: true },
    },
    {
      path: '/reset-password',
      name: 'resetting password',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Accounts/PasswordReset.vue'),
    },
    {
      path: '/profile/:username',
      name: 'user-profile',
      component: () => import('../views/Accounts/UserProfile.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/Accounts/AccountSettings.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/signin',
      name: 'signin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Accounts/MainSignin.vue'),
      meta: { hideNav: true },
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Accounts/MainSignup.vue'),
      meta: { hideNav: true },
    },
    {
      path: '/posts/:postId',
      name: 'each post',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Posts/PostCard.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/posts',
      name: 'all posts',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Posts/AllPosts.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/create-post',
      name: 'create post',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Posts/CreatePost.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  const { isLoggedIn } = storeToRefs(auth)

  await auth.getUser()
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    next({ name: 'login' })
  } else {
    next()
  }
})
export default router
