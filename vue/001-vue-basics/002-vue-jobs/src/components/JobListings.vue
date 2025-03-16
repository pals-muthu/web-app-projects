<script setup>
import { ref, defineProps } from 'vue'
import JobListing from './JobListing.vue'
import jobsData from '../assets/jobs.json'
const jobs = ref(jobsData)

defineProps({
  showButton: {
    type: Boolean,
    default: false,
  },
  limit: Number,
})
</script>

<template>
  <section class="bg-green-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">Browse Jobs</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Job Listing 1 -->
        <JobListing
          v-for="job of jobs.slice(limit ?? jobs.length)"
          :key="job.id"
          class="bg-white rounded-xl shadow-md relative"
          :job="job"
        />
      </div>
    </div>
  </section>
  <section class="m-auto max-w-lg my-10 px-6">
    <a
      href="./jobs"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >View All Jobs</a
    >
  </section>
</template>
