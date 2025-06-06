<!-- !-- sign in, all -->
<template>
  <div class="min-h-screen flex items-center justify-center p-6 bg-gray-50">
    <component :is="currentComponent" @next="nextStep" @back="previousStep" @submit="submit" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../../stores/auth'

import SignIn1 from './SignIn1.vue'
import SignIn2 from './SignIn2.vue'

//login steps
const stage = ref(0)
const auth = useAuthStore()
const router = useRouter()
const components = [SignIn1, SignIn2]
const currentComponent = computed(() => components[stage.value])

const nextStep = () => {
  if (stage.value < components.length - 1) stage.value++
}
const previousStep = () => {
  if (stage.value > 0) stage.value--
}
const submit = async () => {
  try {
    await auth.signInWithEmail(auth.email, auth.password)
    router.push({ name: 'home' })
  } catch (err: any) {
    alert(err.message || 'failed login')
  }
}
</script>

<!-- 
<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="flex flex-col justify-center w-128 h-64 border l-50px border-black bg-white border-rounded-lg shadow-lg rounded-md p-10"
    >

      <div class="items-center space-x-4 mt-1.5 mb-1.5">
        <button @click="login" class="flex-1 btn btn-outline btn-secondary justify-center">
          Sign in with Email
        </button>
        <GSignIn class="flex-1 w-1" />
        <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
      </div>

      <RouterLink to="/" class="flex justify-center">Return</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userInfo } from 'os'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import GSignIn from '../GSignIn.vue'
import { useAuthStore } from '../../../stores/auth'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const auth = useAuthStore()
const router = useRouter()

const login = async () => {
  try {
    await auth.signInWithEmail(email.value, password.value)
    router.push({ name: 'home' })
  } catch (err: any) {
    errorMessage.value = err.message || 'failed login'
  }
}
</script>

<style scoped></style> -->
