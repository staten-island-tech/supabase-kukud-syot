<!-- signin page 2, enter pass -->
<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="flex flex-col justify-center w-128 h-64 border border-black bg-white shadow-lg rounded-md p-10"
    >
      <label>Username:</label>
      <input
        v-model="auth.username"
        type="text"
        placeholder="Enter username"
        class="w-full px-2 py-1 border border-gray-400 rounded"
        @keyup.enter="submit"
      />

      <!-- daisyui -->
      <div class="join grid grid-cols-2 gap-2 mt-4">
        <button class="join-item btn btn-outline" @click="$emit('back')">Previous</button>
        <button class="join-item btn btn-outline" @click="submit">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../../stores/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const auth = useAuthStore()

const emit = defineEmits(['back', 'next', 'submit'])

const submit = () => {
  if (!auth.username) {
    alert('Enter Username')
    return
  }
  emit('submit')
  router.push({ name: 'home' })
}
</script>
