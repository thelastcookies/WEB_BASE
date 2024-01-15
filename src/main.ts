import {createApp} from 'vue'
import './style.css'
import App from './App.vue'

import {createPinia} from 'pinia'
import router from '@/router'

import {Button} from "ant-design-vue";


import './assets/font/font.css'
// import './assets/index.css'

const app = createApp(App);

app.use(createPinia());
app.use(router);

// UI框架 ant-design-vue
app.use(
    Button
);


app.mount('#app');
