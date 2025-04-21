<template>
  <div>
    <div class="g-signin2" data-onsuccess="onSignIn"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

declare global {
  interface Window {
    onSignIn: (googleUser: any) => void
  }
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile()
  console.log('ID: ' + profile.getId())
  console.log('Name: ' + profile.getName())
  console.log('Image URL: ' + profile.getImageUrl())
  console.log('Email: ' + profile.getEmail())
}
</script>

<style scoped></style>
