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
      },
      {
        path: ':id',
        name: 'OneTemplate',
        component: (): any => import('@/views/Template/Main'),
        children: [
          {
            path: '/',
            name: 'OneTemplateBody',
            component: (): any => import('@/views/Template/One')
          },
          {
            path: 'add-column',
            name: 'AddColumnForTemplate',
            component: (): any => import('@/views/Template/AddColumn')
          }
        ]
      }
    ]
  },
  {
    path: "/column",
    name: "Column",
    component: (): any => import('@/views/Column/Main'),
    children: [
      {
        path: 'all',
        name: 'AllColumns',
        component: (): any => import('@/views/Column/All')
      },
      {
        path: 'add',
        name: 'AddColumns',
        component: (): any => import('@/views/Column/Add')
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
