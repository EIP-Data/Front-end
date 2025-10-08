<script setup lang="ts">

</script>

<template>
  <section class="bg-gray-50 py-24 px-6 md:px-16">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">

      <!-- Image -->
      <div class="md:w-1/3 flex justify-center">
        <img
            src="/src/assets/images/home/vindiou.png"
            alt="Contributor illustration"
            class="w-3/4 max-w-sm"
        />
      </div>

      <!-- Texte -->
      <div class="md:w-2/3 text-center md:text-left">
        <p class="text-gray-600 leading-relaxed mb-8">
          Maecenas dignissim justo eget nulla rutrum molestie. Maecenas lobortis sem dui, vel rutrum
          risus tincidunt ullamcorper. Proin eu enim metus. Vivamus sed libero ornare, tristique quam
          in, gravida enim. Nullam ut molestie arcu, at hendrerit elit. Morbi laoreet elit at ligula
          molestie, nec molestie mi blandit. Suspendisse cursus tellus sed augue ultrices, quis
          tristique nulla sodales. Suspendisse eget lorem eu turpis vestibulum pretium. Suspendisse
          potenti. Quisque malesuada enim sapien, vitae placerat ante feugiat eget. Quisque vulputate
          odio neque, eget efficitur libero condimentum id. Curabitur id nibh id sem dignissim finibus
          ac sit amet magna.
        </p>

        <div class="space-y-1 mb-10">
          <h3 class="text-amber-500 font-semibold text-lg">John Doe</h3>
          <p class="text-gray-400">
            British Dragon Boat Racing Association
          </p>
        </div>

        <a
            href="#"
            class="inline-flex items-center gap-2 text-amber-500 font-semibold hover:text-amber-600 transition-all"
        >
          Meet all contributors
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-5 h-5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>


<style scoped>

</style>