<template>
  <div>
    <h1>Welcome, {{ auth.display_name }}!</h1>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
const auth = useAuthStore()
</script>

<style scoped></style>
