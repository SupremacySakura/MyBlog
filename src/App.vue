<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheTab from '@/components/TheTab.vue'
import TheBottom from '@/components/TheBottom.vue';
</script>

<template>
  <header>
    <TheTab></TheTab>
  </header>
  <RouterView></RouterView>
  <TheBottom></TheBottom>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
