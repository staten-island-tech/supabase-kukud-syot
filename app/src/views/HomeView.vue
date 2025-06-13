<template>
  <div class="min-h-screen flex flex-col items-center bg-base-200 p-6">
    <h1 class="text-3xl font-bold mb-6">Welcome, {{ auth.display_name || 'User' }}!</h1>

    <div class="mx-auto p-4 max-w-3xl w-full">
      <div class="card card-side bg-base-100 shadow-xl p-6 rounded-lg">
        <div class="card-body">
          <h2 class="card-title">View Posts</h2>
          <RouterLink to="/posts" class="btn btn-outline mt-4"> Posts </RouterLink>
          <RouterLink to="/create-post" class="btn btn-outline mt-4"> Create Post </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore()
</script>

<style scoped></style>
