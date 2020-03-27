import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/template',
    name: 'Template',
    component: (): any => import('@/views/Template/Main'),
    children: [
      {
        path: 'all',
        name: 'AllTemplates',
        component: (): any => import('@/views/Template/All')
      },
      {
        path: 'add',
        name: 'AddTemplates',
        component: (): any => import('@/views/Template/Add')
      }
    ]
  },
  {
    path: "/dictionary",
    name: "Dictionary",
    component: (): any => import('@/views/Dictionary/Main'),
    children: [
      {
        path: "all",
        name: "AllDictionary",
        component: (): any => import('@/views/Dictionary/All')
      },
      {
        path: "add",
        name: "AddDictionary",
        component: (): any => import('@/views/Dictionary/Add')
      },
      {
        path: ":id",
        name: "OneDictionary",
        component: (): any => import('@/views/Dictionary/One')
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
