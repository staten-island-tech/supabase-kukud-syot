<template>
  <div>
    <SignUp />
    <SignIn class="flex justify-center" />
    <!-- when flex is added, the width of the google login button changes. IDK why -->
    <RouterLink to="/" class="flex justify-center">Return</RouterLink>
  </div>
</template>

<script setup>
import SignUp from '../../components/SignUp.vue'
</script>

<style scoped></style>
