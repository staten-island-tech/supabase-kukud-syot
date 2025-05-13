<template>
  <div class="flex w-64 h-32 items-center justify-center border l-50px border-black bg-white">
    <RouterLink
      to="/signin"
      class="border border-gray-500 rounded-lg w-50 text-center flex justify-center"
      style="font-size: 30px"
    >
      Sign In</RouterLink
    ><!--  when this is clicked the page will bring you to page with /signin and /sign in will be the stuff in mainsignin.vue -->
    <RouterLink
      to="/signup"
      class="border border-gray-500 rounded-lg w-50 text-center flex justify-center"
      style="font-size: 30px"
    >
      Sign Up</RouterLink
    >
  </div>
</template>

<script setup></script>

<style scoped></style>
