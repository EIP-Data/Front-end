<script setup lang="ts">
import Navbar from "@/components/common/Navbar.vue";
import Footer from "@/components/common/Footer.vue";
</script>

<template>
  <div>
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-400 focus:text-slate-900 focus:font-semibold focus:rounded"
    >
      Skip to main content
    </a>
    <Navbar/>
    <main id="main-content" tabindex="-1">
      <slot></slot>
    </main>
    <img src="../../assets/images/home/footer_datalyz.png" style="width:100%" alt="" aria-hidden="true"/>
    <Footer/>
  </div>
</template>

<style scoped></style>