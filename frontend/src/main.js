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
import { Vue3StatusIndicator } from 'vue3-status-indicator'
import 'vue3-status-indicator/dist/style.css'
// import ElementUI from 'element-ui';
// import StatusIndicator from 'vue-status-indicator';

const vueApp = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  vueApp.component(key, component);
}
vueApp.use('vue3-status-indicator',Vue3StatusIndicator)
vueApp.use(VWave);
vueApp.use(VueIframe);
vueApp.use(VueFriendlyIframe);
vueApp.use(VueMapbox, { mapboxgl: Mapbox });
// vueApp.use(ElementUI);
// vueApp.use(StatusIndicator);

vueApp.use(router).use(ElementPlus).mount("#app");

// new Vue({
//     router,
//     render: h => h(App)
//   }).$mount('#app');
