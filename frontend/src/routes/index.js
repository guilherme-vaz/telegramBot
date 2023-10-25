import { createRouter, createWebHistory } from "vue-router";

import AdminLogin from "@/components/AdminLogin.vue";
import AdminRegister from "@/components/AdminRegister.vue";
import BotDash from "@/components/BotDash.vue";

const routes = [
  {
    path: "/",
    component: AdminLogin,
  },
  {
    path: "/register",
    component: AdminRegister,
  },
  {
    path: "/dash",
    component: BotDash,
    // meta: { requiresAuth: true }, // Marque a rota como protegida
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("Token nao presente");
      next("/");
    } else {
      console.log("Token presente");
      next();
    }
  } else {
    // Rota pública, permita o acesso
    next();
  }
});

export default router;
