<template>
  <div>
    <img
      :src="profile_picture || 'https://via.placeholder.com/150'"
      alt="Profile picture"
      class="w-32 h-32 rounded-full object-cover"
    />
    <h1>{{ display_name }}</h1>
    <p>@{{ username }}</p>
    <p>{{ bio }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../../GetKeys'

const route = useRoute()

const display_name = ref('')
const username = ref('')
const bio = ref('')
const profile_picture = ref('')

const getUser = async (usernameParam: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('display_name, username, bio, profile_picture_path')
    .eq('username', usernameParam)
    .maybeSingle()

  if (error) {
    console.error('Error fetching profile:', error.message)
    return
  }

  if (data) {
    display_name.value = data.display_name
    username.value = data.username
    bio.value = data.bio

    if (data.profile_picture_path) {
      const { data: urlData } = supabase.storage
        .from('profile_pictures')
        .getPublicUrl(data.profile_picture_path)

      profile_picture.value = urlData.publicUrl
    }
  }
}

onMounted(() => {
  const usernameParam = route.params.username as string
  if (usernameParam) {
    getUser(usernameParam)
  }
})
</script>
