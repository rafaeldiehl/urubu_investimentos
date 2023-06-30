import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterCardView from '../views/RegisterCardView.vue'
import DashboardView from '../views/DashboardView.vue'
import DepositView from '../views/DepositView.vue'
import WithdrawalView from '../views/WithdrawalView.vue'
import InvestmentView from '../views/InvestmentView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register-card',
    name: 'register-card',
    component: RegisterCardView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/deposit',
    name: 'deposit',
    component: DepositView
  },
  {
    path: '/investment',
    name: 'investment',
    component: InvestmentView
  },
  {
    path: '/withdrawal',
    name: 'withdrawal',
    component: WithdrawalView
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "dashboard" },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
