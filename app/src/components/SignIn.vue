<template>
  <div>
    <div id="g_id_signin"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { GoAuthKey } from '../supabase'

const handleCredentialResponse = (response: any) => {
  const jwt = response.credential
  console.log('JWT Token:', jwt)
  // used later to send to supabase
  // jwt is the user token for google
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
      theme: 'outline',
    })
  }
})
</script>
