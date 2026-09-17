// src/main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';  // 引入 createPinia
import App from './App.vue';
import { gapi } from 'gapi-script'
import router from './router';

gapi.load('client:auth2', () => {
    gapi.client.init({
      clientId: '755896640068-jq8s4ovdv5tcgpmbj323shufqabi7vt8.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/drive.file',
    })
  })
  
const app = createApp(App);

const pinia = createPinia();  // 创建 Pinia 实例
app.use(pinia);  // 使用 Pinia

app.use(router);
app.mount('#app');
