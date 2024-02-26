import {createApp} from 'vue';
import App from './App.vue';
import './assets/index.css';

export const app = createApp(App);

// Pinia
import {createPinia} from 'pinia';
app.use(createPinia());

// router
import router from '@/router';
// 导入路由守卫
import '@/router/guards.ts';
app.use(router);

// UI框架 ant-design-vue
import Antd, {message, notification} from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
app.use(Antd);

// 为各组件提供 message 和 notification
const [msg, msgContextHolder] = message.useMessage();
const [noti, notiContextHolder] = notification.useNotification();

app.provide(MsgInjectionKey, msg);
app.provide(MsgContextHolderInjectionKey, msgContextHolder);
app.provide(NotiInjectionKey, noti);
app.provide(NotiContextHolderInjectionKey, notiContextHolder);

// dayjs 以及本地化
import 'dayjs/locale/zh-cn';
import dayjs from "dayjs";
dayjs.locale('zh-cn');

// UnoCss
import 'unocss';

app.mount('#app');
