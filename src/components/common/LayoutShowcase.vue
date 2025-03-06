<script setup lang="ts">
import Navbar from "@/components/common/Navbar.vue";
import Footer from "@/components/common/Footer.vue";
</script>

<template>
  <div>
    <Navbar/>
    <slot></slot>
    <Footer/>
  </div>
</template>

<style scoped></style>