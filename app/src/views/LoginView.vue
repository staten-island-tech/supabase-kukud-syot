<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="flex items-center justify-center w-128 h-64 border-black border bg-white shadow-lg rounded-md"
    >
      <RouterLink
        to="/signin"
        class="border border-gray-500 rounded-lg w-50 text-center bg-white"
        style="font-size: 30px"
      >
        Sign In</RouterLink
      ><!--  when this is clicked the page will bring you to page with /signin and /sign in will be the stuff in mainsignin.vue -->
      <RouterLink
        to="/signup"
        class="border border-gray-500 rounded-lg w-50 text-center bg-white"
        style="font-size: 30px"
      >
        Sign Up</RouterLink
      >
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
