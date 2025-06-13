<template>
  <div>
    <div class="mx-auto p-4 max-w-3xl">
      <div class="card card-side bg-base-100 shadow-xl p-4">
        <figure class="min-w-[8rem]">
          <img
            :src="profile_picture || '../../../public/favicon.ico'"
            alt="Profile picture"
            class="w-32 h-32 rounded-full object-cover"
          />
        </figure>
        <div class="card-body p-4">
          <h1 class="text-2xl font-bold">{{ display_name }}</h1>
          <div class="flex items-center">
            <p class="text-gray-500">@{{ username }}</p>
            <p class="text-sm text-gray-400 mt-1">Joined: {{ formattedCreatedAt }}</p>
          </div>
          <div class="flex gap-1 text-sm items-center text-gray-600">
            <p>
              <span class="font-semibold">{{ postsNumb }}</span> Posts
            </p>
            <p>
              <span class="font-semibold">{{ followers }}</span> Followers
            </p>
            <p>
              <span class="font-semibold">{{ following }}</span> Following
            </p>
          </div>

          <div class="mt-2">
            <p class="text-base font-semibold mb-1">Bio:</p>
            <p class="text-base leading-relaxed">{{ bio }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-xl p-6 mx-auto max-w-6xl">
      <h1 class="text-2xl font-semibold mb-6">Posts:</h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="post in posts" :key="post.id" class="card bg-base-100 shadow-md p-4">
          <h2 class="text-xl font-bold">{{ post.title }}</h2>
          <p class="text-gray-700 mb-2">{{ post.description }}</p>

          <div class="flex justify-between text-sm text-gray-500 mt-4">
            <p>
              Created:
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
          <router-link :to="`/posts/${post.id}`" class="btn btn-outline mt-4">
            View Post
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../../GetKeys'

const route = useRoute()

const display_name = ref('')
const posts = ref([])
const username = ref('')
const bio = ref('')
const profile_picture = ref('')
const following = ref(0)
const postsNumb = ref(0)
const followers = ref(0)
const likes = ref(0)
const created_at = ref<string | null>(null)
const userId = ref('')

// format created_at  for display
const formattedCreatedAt = computed(() => {
  if (!created_at.value) return ''
  return new Date(created_at.value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

const getUser = async (usernameParam: string) => {
  const { data, error } = await supabase
    .from('users')
    .select(
      'display_name, username, bio, profile_picture_path, followers, following, likes, created_at, id',
    )
    .eq('username', usernameParam)
    .maybeSingle()

  if (error) {
    console.error('Error fetching profile:', error.message)
    return
  }

  if (data) {
    display_name.value = data.display_name
    userId.value = data.id
    username.value = data.username
    bio.value = data.bio
    following.value = data.following ?? 0
    followers.value = data.followers ?? 0
    likes.value = data.likes ?? 0
    created_at.value = data.created_at

    if (data.profile_picture_path) {
      const { data: urlData } = supabase.storage
        .from('profile_pictures')
        .getPublicUrl(data.profile_picture_path)

      profile_picture.value = urlData.publicUrl
    }
  }
}

const getPosts = async () => {
  // fetch posts
  const { data: allPosts, error: postError } = await supabase
    .from('posts')
    .select('id, title, description, created_at, user_id')
    .order('created_at', { ascending: false })

  if (postError) {
    console.error('Error fetching posts:', postError.message)
    return
  }

  // filter posts by user
  const userPosts = allPosts.filter((post) => post.user_id === userId.value)

  //fetch likes
  const { data: likeData, error: likeError } = await supabase.from('post_likes').select('post_id')

  if (likeError) {
    console.error('Error fetching likes:', likeError.message)
    return
  }

  // count likes
  const likeCount = new Map<string, number>()
  likeData?.forEach((like) => {
    const postId = like.post_id
    likeCount.set(postId, (likeCount.get(postId) || 0) + 1)
  })
  posts.value = userPosts.map((post) => ({
    ...post,
    likes: likeCount.get(post.id) || 0,
  }))

  postsNumb.value = posts.value.length
}

onMounted(async () => {
  const usernameParam = route.params.username as string
  if (usernameParam) {
    await getUser(usernameParam)
    await getPosts()
    console.log(posts)
  }
})
</script>
