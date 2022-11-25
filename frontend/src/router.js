import { createRouter, createWebHistory } from "vue-router";
import { Role } from "@/helpers/roles";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Register from "@/views/Register.vue";
import Admin from "@/views/Admin.vue";
import { AuthenticationService } from "./services/auth.service";
//import jwt from "jsonwebtoken"
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { authorize: [] },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { authorize: [Role.Master] },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: { authorize: [Role.Master] },
  },
  // otherwise redirect to home
  { path: "/:catchAll(.*)", redirect: "/" },
];
const router = new createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { authorize } = to.meta;
  const currentUser = AuthenticationService.currentUserValue;
  const currentTokens = AuthenticationService.currentTokensValue;

  if (authorize) {
      if (!currentUser && !currentTokens ) {
          // not logged in so redirect to login page with the return url
          return next({ path: '/login', query: { returnUrl: to.path } });
      }

      // check if route is restricted by role
      if (authorize.length && !authorize.includes(currentUser.roles)) {
          // role not authorised so redirect to home page
          console.log(currentUser.roles)
          if(currentUser.roles === Role.Master) return({ path: '/admin'})
          return next({ path: '/' });
      }
  }
  next();
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ["/login", "/"];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem("user");

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next("/login");
//   } else {
//     next();
//   }
// });
export default router;
