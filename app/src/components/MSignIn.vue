<!-- manual sign in -->
<template>
  <div
    class="flex flex-col items-center justify-center w-128 h-64 border l-50px border-black bg-white border-rounded-lg shadow-lg rounded-md"
  >
    <h1 class="flex item-center justify-center">
      Username: <input type="text" placeholder=" Enter username" />
    </h1>
    <h1 class="flex justify-center">
      Password:
      <input type="text" placeholder=" Enter password" />
    </h1>
  </div>
</template>

<script setup lang="ts">
import { userInfo } from 'os'
</script>

<style scoped></style>
