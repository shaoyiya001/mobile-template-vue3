import { createApp } from 'vue'
import 'lib-flexible'
import './style.css'
import App from './App.vue'
import 'normalize.css/normalize.css'
import router from './router'
import {createPinia} from 'pinia'
const store = createPinia()

createApp(App).use(router).use(store).mount('#app')
