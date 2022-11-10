import { createRouter, createWebHistory }  from "vue-router";
import Login from "./views/Login.vue";
import Welcome from "./views/Welcome.vue";
const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];
const router = new createRouter({
  history:createWebHistory(),
  routes
});
export default router;