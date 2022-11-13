import { createRouter, createWebHistory }  from "vue-router";
import Login from "./views/Login.vue";
import Home from "./views/Home.vue";
import Register from "./views/Register.vue"
import Admin from "./views/Admin.vue"
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path:"/register",
    name:"Register",
    component:Register
  },
  {
    path:"/admin",
    name:"Admin",
    component : Admin
  }
];
const router = new createRouter({
  history:createWebHistory(),
  routes
});
router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
  
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });
export default router;