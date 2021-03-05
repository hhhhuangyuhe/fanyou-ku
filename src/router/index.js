import Vue from 'vue'
import VueRouter from 'vue-router'
import ServiceNetwork from '../views/ServiceNetwork.vue'
import AddNetwork from '../views/AddNetwork.vue'
import OpenAccount from '../views/OpenAccount.vue'
import GeneralPolicyList from '../views/generalPolicy/list.vue'
import GeneralPolicyAdd from '../views/generalPolicy/add.vue'
import UnitPolicyList from '../views/unitPolicy/list.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ServiceNetwork',
    component: ServiceNetwork
  }, {
    path: '/AddNetwork',
    name: 'AddNetwork',
    component: AddNetwork
  }, {
    path: '/OpenAccount',
    name: 'OpenAccount',
    component: OpenAccount
  }, {
    path: '/generalPolicy',
    name: 'GeneralPolicyList',
    component: GeneralPolicyList
  }, {
    path: '/generalPolicy/add',
    name: 'GeneralPolicyAdd',
    component: GeneralPolicyAdd
  }, {
    path: '/unitPolicy',
    name: 'UnitPolicyList',
    component: UnitPolicyList
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
