import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import VueIframe from 'vue-iframes'
import VueFriendlyIframe from 'vue-friendly-iframe';
import VueMapbox from "vue-mapbox";
import Mapbox from "mapbox-gl";

import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import VWave from 'v-wave'

const vueApp = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  vueApp.component(key, component);
}
vueApp.use(VWave);
vueApp.use(VueIframe);
vueApp.use(VueFriendlyIframe);
vueApp.use(VueMapbox, { mapboxgl: Mapbox });

vueApp.use(router).use(ElementPlus).mount("#app");

// new Vue({
//     router,
//     render: h => h(App)
//   }).$mount('#app');
