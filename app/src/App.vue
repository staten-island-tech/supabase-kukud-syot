<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <div class=""><h1 class="text-center text-5xl">LOGO</h1></div>
    <div class="min-h-screen flex flex-col pt-16">
      <div class="flex-1 p-4 flex items-center justify-center">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
