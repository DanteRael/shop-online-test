import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    meta: { requiresAuth: false },
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'home' ,component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/adm',
    component: () => import('layouts/MainLayoutAdm.vue'),
    children: [{ path: '', name: 'home-adm' ,component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'products/create', name: 'create-products' ,component: () => import('pages/CreateProducts.vue') },
      { path: 'products/update/:id?', name: 'update-products' ,component: () => import('pages/UpdateProducts.vue') },
      { path: 'products/delete', name: 'delete-products' ,component: () => import('pages/DeleteProducts.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
