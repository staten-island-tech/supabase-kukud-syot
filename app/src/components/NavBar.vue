<template>
  <div>
    <div class="navbar bg-base-100 shadow-sm">
      <div class="w-10 rounded-full">
        <img
          :src="'/favicon.ico'"
          alt="Profile picture"
          class="w-32 h-auto rounded-md object-cover"
        />
      </div>
      <div class="flex-1">
        <a class="btn btn-ghost text-xl ml-1.5" @click="home">Crocodillo</a>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
        </button>

        <div class="dropdown dropdown-end">
          <h1 tabindex="0" role="button" class="text-xl text-cente btn btn-ghost">
            Hello <span class="font-bold">{{ auth.display_name }}</span>
          </h1>
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                :src="auth.profile_picture || '../../../public/favicon.ico'"
                alt="Profile picture"
                class="w-32 h-32 rounded-full object-cover"
              />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a class="justify-between" @click="profile"> Profile </a>
            </li>
            <li><a @click="settings">Settings</a></li>
            <li><a @click="signOut">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const home = () => {
  router.push('/')
}
const profile = () => {
  router.push(`/profile/${auth.username}`)
}

const settings = () => {
  router.push('/settings')
}

const signOut = async () => {
  try {
    await auth.signOut()
    router.push('/login')
  } catch (error) {
    console.error('logout failed:', error.message)
  }
}
</script>

<style scoped></style>
