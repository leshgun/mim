import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameClassicView from '@/views/GameClassicView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/classic',
      name: 'classic',
      component: GameClassicView
    },
    {
      path: '/infinity',
      name: 'infinity',
      component: HomeView
    }
  ]
})

export default router
