<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const chartOptions = ref({
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false,
    },
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  colors: ['#F9AB3B'],
  xaxis: {
    categories: props.data.labels,
  },
  tooltip: {
    enabled: true,
  },
});

const series = ref([
  {
    name: props.data.datasets[0].label,
    data: props.data.datasets[0].data,
  },
]);
</script>

<template>
  <apexchart
      type="line"
      :options="chartOptions"
      :series="series"
  ></apexchart>
</template>
