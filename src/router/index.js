import Vue from 'vue'
import VueRouter from 'vue-router'
import ServiceNetwork from '../views/ServiceNetwork.vue'
import AddNetwork from '../views/AddNetwork.vue'
import OpenAccount from '../views/OpenAccount.vue'
import GeneralPolicyList from '../views/generalPolicy/list.vue'
import GeneralPolicyAdd from '../views/generalPolicy/add.vue'
import GeneralPolicyDetail from '../views/generalPolicy/detail.vue'
import GeneralPolicyEdit from '../views/generalPolicy/edit.vue'
import UnitPolicyList from '../views/unitPolicy/list.vue'
import UnitPolicyAdd from '../views/unitPolicy/add.vue'
import UnitPolicyDetail from '../views/unitPolicy/detail.vue'
import UnitPolicyEdit from '../views/unitPolicy/edit.vue'
import BusinessAcceptance from '../views/BusinessAcceptance.vue'

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
    path: '/generalPolicy/detail',
    name: 'GeneralPolicyDetail',
    component: GeneralPolicyDetail
  }, {
    path: '/generalPolicy/edit',
    name: 'GeneralPolicyEdit',
    component: GeneralPolicyEdit
  }, {
    path: '/unitPolicy',
    name: 'UnitPolicyList',
    component: UnitPolicyList
  }, {
    path: '/unitPolicy/add',
    name: 'unitPolicy',
    component: UnitPolicyAdd
  }, {
    path: '/unitPolicy/detail',
    name: 'UnitPolicyDetail',
    component: UnitPolicyDetail
  }, {
    path: '/unitPolicy/edit',
    name: 'UnitPolicyEdit',
    component: UnitPolicyEdit
  }, {
    path: '/BusinessAcceptance',
    name: 'BusinessAcceptance',
    component: BusinessAcceptance
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
