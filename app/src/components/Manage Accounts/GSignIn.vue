<template>
  <div>
    <div id="g_id_signin"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { GoAuthKey, supabase } from '../../GetKeys'

async function handleCredentialResponse(response) {
  const googleDisplayName = response?.credential?.displayName
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: response.credential,
  })
  window.location.href = '/'
  console.log(googleDisplayName)

  if (data) {
    //works
    if (googleDisplayName) {
      addData(googleDisplayName)
    }
  }

  if (error) {
    //fail
    console.error('Error signing in:', error.message)
  }
}

const addData = async (display_name: string) => {
  if (!display_name) return

  try {
    //push to public.users
    const { data, error } = await supabase.from('users').insert([{ display_name: display_name }])

    if (error) throw error
    console.log('display name inserted to supabase:', data)
  } catch (error) {
    console.error('error adding display name:', error.message)
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
      width: 300,
      height: 50,
    })
  }
})
</script>
