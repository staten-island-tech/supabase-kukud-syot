<template>
  <div>
    <div id="g_id_signin"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { GoAuthKey, supabase } from '../GetKeys'

function handleCredentialResponse(response) {
  console.log('Encoded JWT ID token: ' + response.credential)
}

const addMessage = async () => {
  try {
    const { data, error } = await supabase
      .from('messages') // Replace 'messages' with your table name
      .insert([{ content: message.value }]) // Replace 'content' with the appropriate column name

    if (error) {
      throw error
    }

    console.log('Message inserted:', data)
  } catch (error) {
    console.error('Error inserting message:', error)
  }
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
