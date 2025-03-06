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
    type: 'pie',
    height: 350,
  },
  labels: props.data.labels,
  colors: props.data.datasets[0].backgroundColor,
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
});

const series = ref(props.data.datasets[0].data);
</script>

<template>
  <apexchart
      type="pie"
      :options="chartOptions"
      :series="series"
  ></apexchart>
</template>
