
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import pinia from './stores'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
