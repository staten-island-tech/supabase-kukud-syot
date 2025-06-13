<template>
  <div class="mx-auto max-w-6xl p-6">
    <h1 class="text-3xl font-bold mb-8">Recent Posts (Last 10 Days)</h1>

    <div v-if="posts.length === 0" class="text-center py-12 text-gray-500">
      No recent posts in the last 10 days.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="post in posts"
        :key="post.id"
        class="card bg-base-100 shadow-md p-4 flex flex-col"
      >
        <div class="flex items-center gap-4 mb-4">
          <img
            v-if="post.profile_picture_path"
            :src="getPublicUrl(post.profile_picture_path)"
            alt="Author profile"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 class="font-semibold text-lg">{{ post.display_name || 'Unknown' }}</h3>
            <p class="text-xs text-gray-500">@{{ post.username || 'unknown' }}</p>
          </div>
        </div>

        <h2 class="text-xl font-bold mb-2 flex-grow">{{ post.title }}</h2>
        <p class="text-gray-700 mb-4">{{ post.description }}</p>

        <div class="flex justify-between text-sm text-gray-500 mt-auto">
          <p>
            Created:
            {{
              new Date(post.created_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })
            }}
          </p>
          <p>Likes: {{ post.likes ?? 0 }}</p>
        </div>

        <router-link :to="`/posts/${post.id}`" class="btn btn-outline mt-4 self-start">
          View Post
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../GetKeys'

const route = useRoute()

const posts = ref<any[]>([])
const userId = ref('')

function getPublicUrl(path: string) {
  return supabase.storage.from('profile_pictures').getPublicUrl(path).data.publicUrl
}

const getUser = async (usernameParam: string) => {
  const { data, error } = await supabase
    .from('users')
    .select(
      'id, username, display_name, bio, profile_picture_path, followers, following, likes, created_at',
    )
    .eq('username', usernameParam)
    .maybeSingle()

  if (error) {
    console.error('Error fetching profile:', error.message)
    return
  }

  if (data) {
    userId.value = data.id
  }
}

const getPosts = async () => {
  const { data: fetchedPosts, error } = await supabase
    .from('posts')
    .select(
      `
      id,
      title,
      description,
      created_at,
      user_id,
      post_likes:post_likes(count),
      users (
        username,
        display_name,
        profile_picture_path
      )
    `,
    )
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error.message)
    return
  }

  if (!fetchedPosts) {
    posts.value = []
    return
  }

  const userPosts = fetchedPosts.filter((post) => post.user_id === userId.value)

  posts.value = userPosts.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    created_at: post.created_at,
    user_id: post.user_id,
    likes:
      Array.isArray(post.post_likes) && post.post_likes.length > 0 ? post.post_likes[0].count : 0,
    username: Array.isArray(post.users) && post.users.length > 0 ? post.users[0].username : '',
    display_name:
      Array.isArray(post.users) && post.users.length > 0 ? post.users[0].display_name : '',
    profile_picture_path:
      Array.isArray(post.users) && post.users.length > 0 ? post.users[0].profile_picture_path : '',
  }))
}

onMounted(async () => {
  const usernameParam = route.params.username as string
  if (usernameParam) {
    await getUser(usernameParam)
    await getPosts()
  }
})
</script>
