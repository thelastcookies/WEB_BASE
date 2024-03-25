import {createApp} from 'vue';
import App from './App.vue';

// 全局样式表
import '@/assets/index.less';

export const app = createApp(App);

app.mount('#app');
