<template>
  <div class="card bg-base-100 shadow-xl p-6 mx-auto max-w-3xl mt-8">
    <h1 class="text-2xl font-semibold mb-6">Post Details</h1>

    <div v-if="post" class="flex flex-col gap-6">
      <!-- Author info like Instagram header -->
      <div class="flex items-center gap-3">
        <img
          v-if="authorProfilePicture"
          :src="authorProfilePicture"
          alt="Profile"
          class="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p class="font-semibold text-gray-900">{{ authorDisplayName }}</p>
          <p class="text-sm text-gray-500">@{{ authorUsername }}</p>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-bold mb-2">{{ post.title }}</h2>
        <p class="text-gray-700 mb-4">{{ post.description }}</p>
      </div>

      <div class="flex justify-between text-sm text-gray-500">
        <p>
          {{
            new Date(post.created_at).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }}
        </p>
        <p>Likes: {{ post.likes }}</p>
      </div>

      <div class="join grid grid-cols-2 gap-2 mt-4">
        <router-link :to="`/profile/${authorUsername}`" class="join-item btn btn-outline">
          View Author Profile
        </router-link>
        <button @click="likePost" class="join-item btn btn-outline">Like Post</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../../GetKeys'
import { useAuthStore } from '../../stores/auth'
const auth = useAuthStore()

const route = useRoute()

// Post data
const post = ref(
  null as null | {
    id: string
    title: string
    description: string
    created_at: string
    user_id: string
    likes: number
  },
)

// author info
const authorDisplayName = ref('')
const authorUsername = ref('')
const authorProfilePicture = ref('')

const fetchPost = async (postId: string) => {
  // fetch
  const { data: postData, error: postError } = await supabase
    .from('posts')
    .select('id, title, description, created_at, user_id')
    .eq('id', postId)
    .maybeSingle()

  if (postError) {
    console.error('Error fetching post:', postError.message)
    return
  }
  if (!postData) {
    console.warn('Post not found')
    return
  }

  // fetch likes
  const { data: likeData, error: likeError } = await supabase
    .from('post_likes')
    .select('post_id')
    .eq('post_id', postId)

  if (likeError) {
    console.error('Error fetching likes:', likeError.message)
  }

  post.value = {
    ...postData,
    likes: likeData ? likeData.length : 0,
  }

  // fetch author
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('display_name, username, profile_picture_path')
    .eq('id', postData.user_id)
    .maybeSingle()

  if (userError) {
    console.error('Error fetching user:', userError.message)
    return
  }

  if (userData) {
    authorDisplayName.value = userData.display_name
    authorUsername.value = userData.username
    if (userData.profile_picture_path) {
      const { data: urlData } = supabase.storage
        .from('profile_pictures')
        .getPublicUrl(userData.profile_picture_path)
      authorProfilePicture.value = urlData.publicUrl
    }
  }
}

const likePost = async () => {
  if (!auth.user || !post.value) return

  const { error } = await supabase.from('post_likes').insert({
    post_id: post.value.id,
    user_id: auth.user.id,
  })

  if (error) {
    console.error('Error liking post:', error.message)
    return
  } else {
    alert('success')
  }

  post.value.likes++
}

onMounted(() => {
  const postId = route.params.postId as string
  if (postId) {
    fetchPost(postId)
    console.log(postId)
  }
})
</script>
