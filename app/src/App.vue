<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <h1 class="text-center text-5xl">LOGO</h1>
    <div class="min-h-screen flex flex-col pt-16">
      <div class="flex-1 p-4">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
