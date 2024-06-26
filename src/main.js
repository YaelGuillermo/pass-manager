import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'tailwindcss/tailwind.css'

createApp(App).use(store).use(router).mount('#app')

import 'tailwindcss/tailwind.css'
import './assets/tailwind.css'
