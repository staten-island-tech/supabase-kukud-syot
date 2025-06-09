import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/GetKeys.js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const email = ref('')
  const password = ref('')
  const isLoggedIn = computed(() => user.value !== null)
  const userEmail = computed(() => user.value?.email ?? '')

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      console.error('failed to get user:', error.message)
      return
    }
    user.value = data.user
  }

  const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    user.value = data.user
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    user.value = null
  }

  const listenToAuthChanges = () => {
    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null
    })
  }

  return {
    //for user management
    user,
    email,
    password,

    //computed stuff
    isLoggedIn,
    userEmail,

    //functions
    getUser,
    signInWithEmail,
    signOut,
    listenToAuthChanges,
  }
})
