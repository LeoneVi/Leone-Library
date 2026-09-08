import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage/HomePage.vue'
import LoginPage from '@/pages/LoginPage/LoginPage.vue'
import ProfilePage from '@/pages/ProfilePage/ProfilePage.vue'
import SignupPage from '@/pages/SignupPage/SignupPage.vue'
import VerifyEmailPage from '@/pages/VerifyEmailPage/VerifyEmailPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPage,
    },
    {
      path: '/user/:username',
      name: 'profile',
      component: ProfilePage,
      props: true,
    },
    {
      path: '/account/verify-email/:key',
      name: 'verify-email',
      component: VerifyEmailPage,
      props: (route) => ({
        verificationKey: String(route.params.key),
      }),
    },
  ],
})

export default router
