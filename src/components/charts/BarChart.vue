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
    type: 'bar',
    height: 350,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded',
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: props.data.labels,
  },
  colors: ['#F9AB3B'],
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
      type="bar"
      :options="chartOptions"
      :series="series"
  ></apexchart>
</template>
