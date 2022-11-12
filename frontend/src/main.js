import { createApp }  from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const vueApp = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    vueApp.component(key, component)
  }
vueApp.use(router).use(ElementPlus).mount('#app')

// new Vue({
//     router,
//     render: h => h(App)
//   }).$mount('#app');
