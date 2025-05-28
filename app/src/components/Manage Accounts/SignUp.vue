<template>
  <div class="flex flex-col items-center space-y-4">
    <h1>Email: <input v-model="email" type="text" placeholder="Enter email" class="ml-2" /></h1>
    <h1>
      Password:
      <input v-model="password" type="password" placeholder="Enter password" class="ml-2" />
    </h1>
    <button @click="signUp" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Sign Up</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../../GetKeys'

const email = ref('')
const password = ref('')

const signUp = async () => {
  if (!email.value || !password.value) {
    alert('Enter both email and password')
    return
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  if (error) {
    console.error('Sign-up error:', error.message)
    alert(error.message)
  } else {
    console.log('User signed up:', data)
    alert('check your email')
  }
}
</script>

<style scoped></style>
