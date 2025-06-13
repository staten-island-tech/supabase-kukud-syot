<template>
  <div class="mx-auto max-w-6xl p-6">
    <h1 class="text-3xl font-bold mb-8">Recent Posts</h1>

    <div v-if="posts.length === 0" class="text-center py-12 text-gray-500">No Posts.</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="post in posts"
        :key="post.id"
        class="card bg-base-100 shadow-md p-4 flex flex-col"
      >
        <div class="flex items-center gap-4 mb-4">
          <img
            v-if="post.authorProfilePicture"
            :src="getPublicUrl(post.authorProfilePicture)"
            alt="Author profile"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 class="font-semibold text-lg">{{ post.authorDisplayName || 'Unknown' }}</h3>
            <p class="text-xs text-gray-500">@{{ post.authorUsername || 'unknown' }}</p>
          </div>
        </div>

        <h2 class="text-xl font-bold mb-2 flex-grow">{{ post.title }}</h2>
        <p class="text-gray-700 mb-4">{{ post.description }}</p>

        <div class="flex justify-between text-sm text-gray-500 mt-auto">
          <p>
            Created:
            {{
              new Date(post.createdAt).toLocaleDateString(undefined, {
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
import { supabase } from '../../GetKeys'

const posts = ref<any[]>([])

function getPublicUrl(path: string) {
  return supabase.storage.from('profile_pictures').getPublicUrl(path).data.publicUrl
}

const getPosts = async () => {
  const { data: postsData, error: postsError } = await supabase
    .from('posts')
    .select('id, title, description, created_at, user_id')
    .order('created_at', { ascending: false })

  if (postsError || !postsData) {
    posts.value = []
    return
  }

  const userIds = Array.from(new Set(postsData.map((post) => post.user_id)))

  const { data: usersData, error: usersError } = await supabase
    .from('users')
    .select('id, username, display_name, profile_picture_path')
    .in('id', userIds)

  if (usersError || !usersData) {
    posts.value = []
    return
  }

  const usersMap = new Map(usersData.map((user) => [user.id, user]))

  const postIds = postsData.map((post) => post.id)
  const { data: likesData, error: likesError } = await supabase
    .from('post_likes')
    .select('post_id')
    .in('post_id', postIds)

  if (likesError || !likesData) {
    posts.value = []
    return
  }

  const likesCountMap = new Map<number, number>()
  likesData.forEach((like) => {
    likesCountMap.set(like.post_id, (likesCountMap.get(like.post_id) ?? 0) + 1)
  })

  posts.value = postsData.map((post) => {
    const user = usersMap.get(post.user_id)
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      createdAt: post.created_at,
      likes: likesCountMap.get(post.id) ?? 0,
      authorUsername: user?.username ?? '',
      authorDisplayName: user?.display_name ?? '',
      authorProfilePicture: user?.profile_picture_path ?? '',
    }
  })
}

onMounted(() => {
  getPosts()
})
</script>
