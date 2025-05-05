<template>
  <div>
    <MSignIn />
    <button class="text-xl">Sign In</button>
    <GSignIn class="flex justify-center" />
    <ASignIn />
    <!-- when flex is added, the width of the google login button changes. IDK why -->
    <RouterLink to="/" class="flex justify-center">Return</RouterLink>
  </div>
</template>

<script setup>
import GSignIn from '../../components/account providers/SignIn.vue'
import ASignIn from '../../components/account providers/ASignIn.vue'
import MSignIn from '../../components/account providers/MSignIn.vue'
</script>

<style scoped></style>
