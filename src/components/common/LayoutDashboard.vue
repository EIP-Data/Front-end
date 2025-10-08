<script setup lang="ts">

</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <div class="flex flex-col flex-1">
      <Navbar />
      <main class="p-6 overflow-auto flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>

</style>