<!-- manual sign in -->
<template>
  <div>
    <h1 class="flex justify-center">User: <input type="text" placeholder=" Enter username" /></h1>
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
