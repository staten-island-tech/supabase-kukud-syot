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

onMounted(() => {
  // Ensure onSignIn function is bound to window, accessible globally
  window.onSignIn = (googleUser: any) => {
    var profile = googleUser.getBasicProfile()
    console.log('ID: ' + profile.getId()) // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName())
    console.log('Image URL: ' + profile.getImageUrl())
    console.log('Email: ' + profile.getEmail()) // This is null if the 'email' scope is not present.
  }
})
</script>

<style scoped></style>
