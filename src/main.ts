import {createApp} from 'vue';
import './style.css';
import App from './App.vue';

import {createPinia} from 'pinia';
import router from '@/router';

import './assets/index.css';

const app = createApp(App);

// Pinia
app.use(createPinia());
// router
app.use(router);

// UI框架 ant-design-vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
app.use(Antd);

// dayjs 以及本地化
import 'dayjs/locale/zh-cn';
import dayjs from "dayjs";
dayjs.locale('zh-cn');

app.mount('#app');
