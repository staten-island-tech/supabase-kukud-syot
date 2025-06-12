import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/GetKeys.js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const username = ref('')
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

  const signUpWithEmail = async (email: string, password: string, username: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    user.value = data.user

    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user?.id) {
        const userId = session.user.id

        const { error: insertError } = await supabase
          .from('users')
          .insert([{ id: userId, username }])

        if (insertError) {
          console.error('Failed to insert username:', insertError.message)
          throw insertError
        }
        user.value = session.user
      }
    })
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

  const resetPasssword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://www.crocodillo.org/reset-password',
    })
    if (error) throw error
    return data
  }

  const updatePassword = async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw error
    return data
  }

  return {
    //for user management
    user,

    username,
    email,
    password,

    //computed stuff
    isLoggedIn,
    userEmail,

    //functions
    getUser,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    resetPasssword,
    updatePassword,
    listenToAuthChanges,
  }
})
