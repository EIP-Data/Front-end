<script setup lang="ts">
import {onMounted} from 'vue';

onMounted(async () => {
  window.tsParticles.load("tsparticles", {
    particles: {
      number: {
        value: 150,
      },
      color: {
        value: "#F9AB3B",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: 3,
      },
      links: {
        enable: true,
        distance: 150,
        color: "#F9AB3B",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
      },
    },
    background: {
      color: "#ffffff",
    },
  });
});
</script>

<template>
</template>

<style scoped>
#tsparticles canvas {
  position: absolute!important;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>