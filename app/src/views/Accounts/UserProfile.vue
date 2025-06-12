<template>
  <div>
    <img
      :src="auth.profile_picture"
      alt="Profile picture"
      class="w-32 h-32 rounded-full object-cover"
    />
    <h1>{{ auth.display_name }}</h1>
    <p>@{{ auth.username }}</p>
    <p>{{ auth.bio }}</p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth'

const auth = useAuthStore()
</script>
