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

import SignUp1 from './SignUp1.vue'
import SignUp2 from './SignUp2.vue'
import SignUp3 from './SignUp3.vue'

//login steps
const stage = ref(0)
const auth = useAuthStore()
const router = useRouter()
const components = [SignUp1, SignUp2, SignUp3]
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
