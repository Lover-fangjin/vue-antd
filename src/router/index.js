import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Company from '../views/company'
import Login from '../views/login/login.vue'
import companys from './company'
import Home from '../views/home/home'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    meta: { title:'首页'},
    children:[
      {
        path: '/home',
        name: 'home',
        component: Home,
      },
      {
        path: '/company',
        name: 'Company',
        component: Company,
        children:companys,
        meta: { title:'公司管理'}
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  routes
})

export default router
