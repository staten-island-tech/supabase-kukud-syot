<template>
  <div>
    <div class="card bg-base-100 shadow-xl p-6 mx-auto max-w-3xl mt-8">
      <h1 class="text-2xl font-semibold mb-6">Account Settings</h1>

      <div class="mb-4">
        <label class="label font-semibold">Display Name</label>
        <input
          v-model="displayNameInput"
          type="text"
          placeholder="Your display name"
          class="input input-bordered w-full"
        />
        <button class="btn btn-sm mt-2" @click="updateDisplayName">Save</button>
      </div>
      <div class="mb-4">
        <label class="label font-semibold">Username</label>
        <input
          v-model="userNameInput"
          type="text"
          placeholder="Username"
          class="input input-bordered w-full"
        />
        <button class="btn btn-sm mt-2" @click="updateuserName">Save</button>
      </div>

      <div class="mb-4">
        <label class="label font-semibold">Profile Picture</label>
        <input
          type="file"
          class="file-input file-input-bordered w-full"
          @change="handleFileUpload"
        />
        <button class="btn btn-sm mt-2" @click="uploadProfilePicture">Upload</button>
        <div v-if="previewUrl" class="mt-2">
          <img :src="previewUrl" alt="Preview" class="w-24 h-24 rounded-full object-cover" />
        </div>
      </div>

      <!-- Bio -->
      <div class="mb-4">
        <label class="label font-semibold">Bio</label>
        <textarea
          v-model="bioInput"
          placeholder="Tell us about yourself..."
          class="textarea textarea-bordered w-full"
          rows="4"
        ></textarea>
        <button class="btn btn-sm mt-2" @click="updateBio">Save</button>
      </div>

      <div class="mt-8 border-t pt-6 border-red-300">
        <h2 class="text-xl font-semibold text-red-500 mb-2">NO DO DIS</h2>
        <button class="btn btn-error" @click="deleteAccount">Delete Account</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'

const auth = useAuthStore()

const displayNameInput = ref(auth.display_name)
const userNameInput = ref(auth.username)
const bioInput = ref(auth.bio)
const selectedFile = ref<File | null>(null)
const previewUrl = ref<string>('')

onMounted(() => {
  if (auth.user?.id) {
    auth.getData(auth.user.id)
    auth.getPFP(auth.user.id)
  }

  displayNameInput.value = auth.display_name
  bioInput.value = auth.bio
})

const updateDisplayName = async () => {
  if (!displayNameInput.value.trim()) return
  await auth.updateDisplayName(displayNameInput.value)
  alert('success')
}

const updateUserName = async () => {
  if (!userNameInput.value.trim()) return
  await auth.updateUserName(userNameInput.value)
  alert('success')
}

const updateBio = async () => {
  if (!bioInput.value.trim()) return
  await auth.updateBio(bioInput.value)
  alert('success')
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0] //if as thing removed, ts error
  if (file) {
    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

const uploadProfilePicture = async () => {
  if (!selectedFile.value) return
  await auth.uploadProfilePicture(selectedFile.value)
}

const deleteAccount = async () => {
  await auth.deleteAccount()
  alert('success')
}
</script>
