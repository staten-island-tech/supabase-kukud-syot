<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <div class="flex items-center justify-center">
      <img src="/favicon.ico" alt="icon" class="flex h-12 w-auto" />
      <h1 class="flex text-center text-5xl">LOGO</h1>
    </div>
    <div class="min-h-screen flex flex-col pt-16">
      <div class="flex-1 p-4">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
