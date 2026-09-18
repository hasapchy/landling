<template>
    <div class="star-field">
      <span
        v-for="(s, i) in stars" :key="i"
        class="star"
        :style="{
          left: s.left + '%',
          bottom: s.bottom + 'px',
          width: s.size + 'px',
          height: s.size + 'px',
          animationDuration: s.duration + 's',
          animationDelay: s.delay + 's',
        }"
      ></span>
    </div>
  </template>
  
  <script setup>
const stars = [
  { left: 42, bottom: 10, size: 5, duration: 1.2, delay: 0   },
  { left: 40, bottom: 60, size: 3, duration: 1.8, delay: 0.3 },
  { left: 47, bottom: 20, size: 4, duration: 1.0, delay: 0.6 },
  { left: 53, bottom: 90, size: 3, duration: 2.0, delay: 0.1 },
  { left: 60, bottom: 30, size: 5, duration: 1.5, delay: 0.5 },
  { left: 44, bottom: 55, size: 3, duration: 1.3, delay: 0.8 },
  { left: 58, bottom: 70, size: 4, duration: 1.7, delay: 0.2 },
];
  </script>