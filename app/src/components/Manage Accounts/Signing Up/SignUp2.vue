<!-- signin page 2, enter pass -->
<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="flex flex-col justify-center w-128 h-64 border border-black bg-white shadow-lg rounded-md p-10"
    >
      <label>Password:</label>
      <input
        v-model="auth.password"
        type="password"
        placeholder="Enter password"
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
const auth = useAuthStore()

const emit = defineEmits(['back', 'next'])

const submit = () => {
  if (!auth.password) {
    alert('Enter Password')
    return
  }
  emit('next')
}
</script>
