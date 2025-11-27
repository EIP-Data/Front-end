<script setup lang="ts">
import Navbar from "@/components/common/Navbar.vue";
import Footer from "@/components/common/Footer.vue";
</script>

<template>
  <div>
    <Navbar/>
    <slot></slot>
    <img src="/src/assets/images/home/footer_datalyz.png" style="width:100%" alt="footer"/>
    <Footer/>
  </div>
</template>

<style scoped></style>