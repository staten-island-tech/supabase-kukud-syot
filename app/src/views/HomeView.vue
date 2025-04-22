<template>
  <div>
    <MSignIn />
    <button class="text-center text-2xl">Sign In</button>
    <SignIn class="flex justify-center" />
    <!-- when flex is added, the width of the google login button changes. IDK why -->
  </div>
</template>

<script setup>
import SignIn from '../components/SignIn.vue'
import MSignIn from '../components/MSignIn.vue'
</script>

<style scoped></style>
