<script setup lang="ts">
</script>

<template>
  <section class="bg-white py-24 px-6 md:px-16 text-center">
    <div class="max-w-3xl mx-auto mb-16">
      <h2 class="text-4xl font-extrabold text-gray-800 mb-2">
        Manage all the data you collect
      </h2>
      <p class="text-gray-500 text-lg">
        Who is Datalyz suitable for?
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
      <div
          class="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-10 flex flex-col items-center space-y-4"
      >
        <img
            src="/src/assets/images/home/icon_users.png"
            alt="Users icon"
            class="w-12 h-12"
        />
        <h3 class="text-2xl font-bold text-gray-800">Users</h3>
        <p class="text-gray-600">
          Our data management software enables complete automation, from data
          collection to analysis and visualisation.
        </p>
      </div>

      <div
          class="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-10 flex flex-col items-center space-y-4"
      >
        <img
            src="/src/assets/images/home/icon_associations.png"
            alt="Associations icon"
            class="w-12 h-12"
        />
        <h3 class="text-2xl font-bold text-gray-800">Associations</h3>
        <p class="text-gray-600">
          You can choose whether or not to share which data with whom.
        </p>
      </div>

      <div
          class="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-10 flex flex-col items-center space-y-4"
      >
        <img
            src="/src/assets/images/home/icon_community.png"
            alt="Community icon"
            class="w-12 h-12"
        />
        <h3 class="text-2xl font-bold text-gray-800">Community</h3>
        <p class="text-gray-600">
          Datalyz is open source to advance the field of research.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
