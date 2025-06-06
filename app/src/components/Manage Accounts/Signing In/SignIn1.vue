<!-- signin page 1, enter email -->
<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="flex flex-col justify-center w-128 h-64 border border-black bg-white shadow-lg rounded-md p-10"
    >
      <label>Email:</label>
      <input
        v-model="auth.email"
        type="email"
        placeholder="Enter email"
        class="w-full px-2 py-1 border border-gray-400 rounded"
        @keyup.enter="submit"
      />

      <!-- daisyui -->
      <div class="join grid grid-cols-2 gap-2 mt-4">
        <button class="join-item btn btn-outline opacity-50 cursor-not-allowed" disabled>
          Previous
        </button>
        <button class="join-item btn btn-outline" @click="submit">Next</button>
      </div>

      <div class="flex justify-center items-center space-x-4 mt-1.5 mb-1.5">
        <GSignIn />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../../stores/auth'
import GSignIn from '../GSignIn.vue'

const auth = useAuthStore()

const emit = defineEmits(['next'])

const submit = () => {
  if (!auth.email) {
    alert('Enter email')
    return
  }
  emit('next')
}
</script>
