import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }]
  },
  {
    path: '/map',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Leaflet.vue') }
    ]
  },
  {
    path: '/chart',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'echarts-vue', component: () => import('pages/EChartVuePage.vue') },
      { path: 'echarts', component: () => import('pages/EChartsPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
