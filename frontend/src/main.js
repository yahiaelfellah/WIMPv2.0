import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import Vuex from "vuex";
import { auth } from "./store/auth.store";
import VeeValidate from 'vee-validate';
import VueIframe from 'vue-iframes'
import VueFriendlyIframe from 'vue-friendly-iframe';

import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const vueApp = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  vueApp.component(key, component);
}
const store = new Vuex.Store({
  modules: {
    auth,
  },
});
vueApp.use(VeeValidate);
vueApp.use(VueIframe);
vueApp.use(VueFriendlyIframe);
vueApp.use(router);
vueApp.use(store).use(ElementPlus).mount("#app");

// new Vue({
//     router,
//     render: h => h(App)
//   }).$mount('#app');
