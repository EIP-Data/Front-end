<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <div>
    <Navbar />
    <main class="container mx-auto px-6 py-12">
      <section class="text-center">
        <h1 class="text-5xl font-bold text-[#F9AB3B]">
          Bienvenue sur Datalyz
        </h1>
        <p class="mt-4 text-gray-600 text-xl">
          Découvrez comment nous transformons vos données en opportunités.
        </p>
        <div class="mt-8">
          <a
              href="#"
              class="bg-[#F9AB3B] text-white px-6 py-3 rounded-lg hover:bg-[#e6952e] transition duration-300"
          >
            Commencer
          </a>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>
