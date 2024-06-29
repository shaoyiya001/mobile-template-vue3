import { createApp } from 'vue'
import 'lib-flexible'
import './style.css'
import App from './App.vue'
import 'normalize.css/normalize.css'
import router from './router'

createApp(App).use(router).mount('#app')
