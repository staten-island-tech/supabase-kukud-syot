<template>
  <div
    class="flex flex-col items-center justify-center w-128 h-64 border l-50px border-black bg-white border-rounded-lg shadow-lg rounded-md"
  >
    <h1>
      Email: <input v-model="email" type="text" placeholder="Enter an email" class="w-[12ch]" />
    </h1>
    <h1>
      Password:
      <input v-model="password" type="password" placeholder="Enter password" class="w-[13ch]" />
    </h1>
    <button
      @click="signUp"
      class="flex flex-col justify-center mt-4 bg-blue-500 text-white px-4 py-2 rounded"
    >
      Sign Up
    </button>

    <!--  <RouterLink
      to="/signin"
      class="flex justify-center mt-2 border-t-2 border-gray-300 pt-2 text-black hover:text-blue-800"
    >
      Have an account? Sign In</RouterLink
    > -->
    <RouterLink to="/" class="flex justify-center">Return</RouterLink>
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
