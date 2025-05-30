<!-- manual sign in -->
<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="flex flex-col items-center justify-center w-128 h-64 border l-50px border-black bg-white border-rounded-lg shadow-lg rounded-md"
    >
      <h1 class="flex item-center justify-center">
        Username: <input type="text" placeholder=" Enter username" class="w-[14ch]" />
      </h1>
      <h1 class="flex justify-center">
        Password: <input type="text" placeholder=" Enter password" class="w-[14ch]" />
      </h1>
      <br />
      <GSignIn class="flex justify-center" />
      <RouterLink to="/" class="flex justify-center">Return</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userInfo } from 'os'
import GSignIn from './GSignIn.vue'
</script>

<style scoped></style>
