import { createApp } from 'vue'
import 'lib-flexible'
import './style.css'
import App from './App.vue'
import 'normalize.css/normalize.css'
import router from './router'
import pinia from './store'
import Vconsole from 'vconsole'

console.log(import.meta.env)
if(import.meta.env.VITE_ENV !== 'production') {
    // 测试和开发环境打开
    new Vconsole();
}

createApp(App).use(router).use(pinia).mount('#app')
