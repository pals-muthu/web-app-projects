<script setup>
import HeroComponent from '@/components/HeroComponent.vue'
import HomeCards from '@/components/HomeCards.vue'
import JobListings from '@/components/JobListings.vue'
</script>
<template>
  <HeroComponent />
  <HomeCards />
  <JobListings :limit="3" :show-button="true" />
</template>
