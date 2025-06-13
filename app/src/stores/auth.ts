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
  const display_name = ref('')
  const profile_picture = ref('')
  const bio = ref('')

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      console.error('failed to get user:', error.message)
      return
    }
    user.value = data.user
  }

  const getData = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('display_name, username, bio')
      .eq('id', userId)
      .maybeSingle()

    if (!error && data) {
      display_name.value = data.display_name
      username.value = data.username
      bio.value = data.bio
    }
  }

  const getPFP = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('profile_picture_path')
      .eq('id', userId)
      .maybeSingle()

    if (error) {
      console.error('Failed to fetch profile picture path:', error.message)
      profile_picture.value = ''
      return
    }

    if (data && data.profile_picture_path) {
      const { data: urlData } = await supabase.storage
        .from('profile-pictures')
        .getPublicUrl(data.profile_picture_path)
      profile_picture.value = urlData.publicUrl
    }
  }

  const updateDisplayName = async (newName: string) => {
    if (!user.value) return
    await supabase.from('users').update({ display_name: newName }).eq('id', user.value.id)
    display_name.value = newName
  }

  const updateBio = async (newBio: string) => {
    if (!user.value) return
    await supabase.from('users').update({ bio: newBio }).eq('id', user.value.id)
    bio.value = newBio
  }

  const uploadProfilePicture = async (file: File) => {
    if (!user.value) return

    const fileName = `${user.value.id}-${Date.now()}-${file.name}`
    const { error: uploadErr } = await supabase.storage
      .from('profile-pictures')
      .upload(fileName, file, {
        upsert: true,
        contentType: file.type,
      })

    if (uploadErr) {
      console.error('Upload failed:', uploadErr.message)
      return
    }

    await supabase.from('users').update({ profile_picture_path: fileName }).eq('id', user.value.id)
    await getPFP(user.value.id)
  }

  const deleteAccount = async () => {
    if (!user.value) return

    const confirmed = confirm(
      'Are you sure you want to delete your account? This cannot be undone.',
    )
    if (!confirmed) return

    await supabase.from('users').delete().eq('id', user.value.id)

    const { error } = await supabase.auth.admin.deleteUser(user.value.id)
    if (error) {
      console.error('Failed to delete auth user:', error.message)
      return
    }

    await signOut()
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
      if (user.value && user.value.id) {
        getData(user.value.id)
      } else {
        display_name.value = ''
      }
    })
  }

  const resetPasssword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://auth.crocodillo.org/reset-password',
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

    display_name,
    username,
    email,
    password,
    profile_picture,
    bio,

    //computed stuff
    isLoggedIn,
    userEmail,

    //functions
    getData,
    getPFP,
    getUser,
    signInWithEmail,
    signUpWithEmail,
    updateDisplayName,
    uploadProfilePicture,
    updateBio,
    deleteAccount,
    signOut,
    resetPasssword,
    updatePassword,
    listenToAuthChanges,
  }
})
