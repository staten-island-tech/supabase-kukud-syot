<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="flex items-center justify-center w-128 h-64 border-black border bg-white shadow-lg rounded-md p-10"
    >
      <div class="join grid grid-cols-2 gap-2 mt-4">
        <RouterLink to="/signin" class="join-item btn btn-outline" style="font-size: 30px" te>
          Sign In</RouterLink
        ><!--  when this is clicked the page will bring you to page with /signin and /sign in will be the stuff in mainsignin.vue -->
        <RouterLink to="/signup" class="join-item btn btn-outline" style="font-size: 30px">
          Sign Up</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
