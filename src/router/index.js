import Vue from 'vue'
import VueRouter from 'vue-router'
import ServiceBranch from '../views/ServiceBranch.vue'
import AddBranch from '../views/AddBranch.vue'
import OpenAccount from '../views/OpenAccount.vue'
import GeneralPolicyList from '../views/GeneralPolicy/List.vue'
import GeneralPolicyAdd from '../views/GeneralPolicy/Add.vue'
import GeneralPolicyDetail from '../views/GeneralPolicy/Detail.vue'
import GeneralPolicyEdit from '../views/GeneralPolicy/Edit.vue'
import UnitPolicyList from '../views/UnitPolicy/List.vue'
import UnitPolicyAdd from '../views/UnitPolicy/Add.vue'
import UnitPolicyDetail from '../views/UnitPolicy/Detail.vue'
import UnitPolicyEdit from '../views/UnitPolicy/Edit.vue'
import BusinessAcceptance from '../views/BusinessAcceptance.vue'
import OrderFeedback from '../views/OrderFeedback.vue'
import InsuredEmployees from '../views/InsuredEmployees.vue'
import HostingApplyList from '../views/Hosting/ApplyList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ServiceBranch',
    component: ServiceBranch
  }, {
    path: '/AddBranch',
    name: 'AddBranch',
    component: AddBranch
  }, {
    path: '/OpenAccount',
    name: 'OpenAccount',
    component: OpenAccount
  }, {
    path: '/GeneralPolicy',
    name: 'GeneralPolicyList',
    component: GeneralPolicyList
  }, {
    path: '/GeneralPolicyAdd',
    name: 'GeneralPolicyAdd',
    component: GeneralPolicyAdd
  }, {
    path: '/GeneralPolicyDetail',
    name: 'GeneralPolicyDetail',
    component: GeneralPolicyDetail
  }, {
    path: '/GeneralPolicyEdit',
    name: 'GeneralPolicyEdit',
    component: GeneralPolicyEdit
  }, {
    path: '/UnitPolicy',
    name: 'UnitPolicyList',
    component: UnitPolicyList
  }, {
    path: '/UnitPolicyAdd',
    name: 'UnitPolicy',
    component: UnitPolicyAdd
  }, {
    path: '/UnitPolicyDetail',
    name: 'UnitPolicyDetail',
    component: UnitPolicyDetail
  }, {
    path: '/UnitPolicyEdit',
    name: 'UnitPolicyEdit',
    component: UnitPolicyEdit
  }, {
    path: '/BusinessAcceptance',
    name: 'BusinessAcceptance',
    component: BusinessAcceptance
  }, {
    path: '/OrderFeedback',
    name: 'OrderFeedback',
    component: OrderFeedback
  }, {
    path: '/InsuredEmployees',
    name: 'InsuredEmployees',
    component: InsuredEmployees
  }, {
    path: '/Hosting/ApplyList',
    name: 'HostingApplyList',
    component: HostingApplyList
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
