<template>
  <div>
    <MSignIn />
    <GSignIn class="flex justify-center" />
    <!-- when flex is added, the width of the google login button changes. IDK why -->
    <RouterLink to="/" class="flex justify-center">Return</RouterLink>
  </div>
</template>

<script setup>
import GSignIn from '../../components/GSignIn.vue'
import MSignIn from '../../components/MSignIn.vue'
</script>

<style scoped></style>
