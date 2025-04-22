<template>
  <div>
    <div id="g_id_signin"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { GoAuthKey } from '../GetKeys'

function handleCredentialResponse(response) {
  console.log('Encoded JWT ID token: ' + response.credential)
}

onMounted(() => {
  // @ts-ignore since google is a external script
  if (window.google) {
    // @ts-ignore
    window.google.accounts.id.initialize({
      client_id: GoAuthKey,
      callback: handleCredentialResponse,
      ux_mode: 'popup', // google popup and not a redirect
    })

    // @ts-ignore
    window.google.accounts.id.renderButton(document.getElementById('g_id_signin'), {
      scope: 'profile email',
      width: 240,
      height: 50,
    })
  }
})
</script>
