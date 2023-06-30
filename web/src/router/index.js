import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import CreateCreditCardView from '../views/CreateCreditCardView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginView
  },
  {
    path: '/create-credit-card',
    name: 'create-credit-card',
    component: CreateCreditCardView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
