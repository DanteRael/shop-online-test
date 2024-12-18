const routes = [
  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      { path: "", component: () => import("pages/LoginPage.vue"), name: "login" },
    ],
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/adm",
    component: () => import("layouts/MainLayoutAdm.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue"), name: "adm-home" },
      { 
        path: "products/create", 
        name: "create-products", 
        component: () => import("pages/CreateProducts.vue") 
      },
      { 
        path: "products/update/:id?", 
        name: "update-products", 
        component: () => import("pages/UpdateProducts.vue") 
      },
      { 
        path: "products/delete/:id?", 
        name: "delete-products", 
        component: () => import("pages/DeleteProducts.vue") 
      },
    ],
    meta: { requiresAuth: true, adminOnly: true },
  },
  {
    path: "/home",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue"), name: "home" },
    ],
    meta: { requiresAuth: true },
  },
  
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
]

export default routes