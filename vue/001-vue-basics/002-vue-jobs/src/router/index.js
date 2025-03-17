import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import JobsPage from '@/views/JobsPage.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import JobPage from '@/views/JobPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: JobsPage,
    },
    {
      path: '/jobs/:id',
      name: 'job',
      component: JobPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundView,
    },
    {
      path: '/:pathMatch(.*)',
      name: 'badNotFound',
      component: NotFoundView,
    },
  ],
})

export default router
