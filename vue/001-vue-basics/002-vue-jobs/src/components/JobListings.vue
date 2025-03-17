<script setup>
import { defineProps, onMounted, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import JobListing from './JobListing.vue'
import axios from 'axios'

defineProps({
  showButton: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: Number,
    default: 0,
  },
})

const state = reactive({
  jobs: [],
  isLoading: true,
})

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5010/jobs')
    state.jobs = response.data
  } catch (error) {
    console.error('Errof fetching: ', error)
  } finally {
    state.isLoading = false
  }
})
</script>

<template>
  <section class="bg-green-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">Browse Jobs</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Job Listing 1 -->
        <JobListing
          v-for="job of state.jobs.slice(0, limit || state.jobs.length)"
          :key="job.id"
          class="bg-white rounded-xl shadow-md relative"
          :job="job"
        />
      </div>
    </div>
  </section>
  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/jobs"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >View All Jobs</RouterLink
    >
  </section>
</template>
