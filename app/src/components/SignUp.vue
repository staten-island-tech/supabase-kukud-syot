<template>
  <div>
    <h1 class="flex justify-center">
      First name: <input type="text" placeholder=" Enter First name" />
    </h1>
    <h1 class="flex justify-center">
      Last Name: <input type="text" placeholder=" Enter Last name" />
    </h1>
    <h1 class="flex justify-center">
      Username: <input type="text" placeholder=" Enter username" />
    </h1>
    <h1 class="flex justify-center">
      Password: <input type="text" placeholder=" Enter password" />
    </h1>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

<!-- const addID = async (jwtToken) => {
  if (!jwtToken) return

  try {
    const { data, error } = await supabase.from('users').insert([{ google_jwt: jwtToken }])

    if (error) throw error
    console.log('id inserted to supabase:', data)
  } catch (error) {
    console.error('error adding ID:', error.message)
  }
} -->
