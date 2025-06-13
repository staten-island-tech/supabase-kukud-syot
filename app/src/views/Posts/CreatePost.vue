<template>
  <div class="card bg-base-100 shadow-xl p-6 mx-auto max-w-3xl mt-8">
    <h1 class="text-2xl font-semibold mb-6">Create a New Post</h1>

    <div class="mb-4">
      <label class="label font-semibold">Title</label>
      <input
        v-model="title"
        type="text"
        placeholder="Enter post title"
        class="input input-bordered w-full"
      />
    </div>

    <div class="mb-4">
      <label class="label font-semibold">Description</label>
      <textarea
        v-model="description"
        placeholder="Write your post..."
        class="textarea textarea-bordered w-full"
        rows="5"
      ></textarea>
    </div>

    <button class="btn btn-outline" @click="createPost">Create Post</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { supabase } from '../../GetKeys'

const auth = useAuthStore()
const router = useRouter()

const title = ref('')
const description = ref('')
const isPublished = ref(false)

const createPost = async () => {
  const userId = auth.user?.id

  const { error } = await supabase.from('posts').insert({
    user_id: userId,
    title: title.value,
    description: description.value,
    is_published: isPublished.value,
    published_at: isPublished.value ? new Date().toISOString() : null,
  })

  if (error) {
    console.error('Error creating post:', error)
    alert('Failed')
  } else {
    alert('success')
    title.value = ''
    description.value = ''
    isPublished.value = false
  }
}
</script>
