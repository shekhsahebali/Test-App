import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HowItWorks from '@/views/HowItWorks.vue'
import Faq from '@/views/Faq.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/how-it-works',
      name: 'HowItWorks',
      component: HowItWorks,
    },
     {
      path: '/faq',
      name: 'Faq',
      component: Faq,
    },

  ],
})

export default router
