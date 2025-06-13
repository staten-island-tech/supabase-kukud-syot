<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
//@ts-ignore
import NavBar from './components/NavBar.vue'
import NavBar2 from './components/NavBar2.vue'
import { computed } from 'vue'

const router = useRoute()
const showNav = computed(() => !router.meta.hideNav)
</script>

<template>
  <div>
    <NavBar v-if="showNav" />
    <NavBar2 v-if="!showNav" />
    <div class="min-h-screen flex flex-col pt-16">
      <div class="flex-1 p-4">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
