<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="flex flex-col justify-center w-128 border border-black bg-white shadow-lg rounded-md p-10 gap-4"
    >
      <label>New Password:</label>
      <input
        v-model="password"
        type="password"
        placeholder="Enter new password"
        class="w-full px-2 py-1 border border-gray-400 rounded"
      />

      <label>Confirm Password:</label>
      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm new password"
        class="w-full px-2 py-1 border border-gray-400 rounded"
        @keyup.enter="submit"
      />

      <button class="btn btn-outline mt-4" @click="submit">Reset Password</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../../GetKeys'
import { useRouter } from 'vue-router'

const router = useRouter()

const password = ref('')
const confirmPassword = ref('')

const submit = async () => {
  if (!password.value || !confirmPassword.value) {
    alert('Missing a field')
    return
  }

  if (password.value !== confirmPassword.value) {
    alert("Passwords don't match")
    return
  }

  const { error } = await supabase.auth.updateUser({
    password: password.value,
  })

  if (error) {
    alert('Failed: ' + error.message)
  } else {
    alert('Password reset successful')
    router.push({ name: 'signin' })
  }
}
</script>
