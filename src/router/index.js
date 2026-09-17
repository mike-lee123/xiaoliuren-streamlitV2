import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const base = '/';

const routes = [
  { path: `${base}`, name: 'Home', component: Home },
  { path: `${base}content`, name: 'Content', component: () => import('../views/Content.vue') },
  { path: `${base}login`, name: 'Login', component: () => import('../views/Login.vue') },
  { path: `${base}register`, name: 'Register', component: () => import('../views/Register.vue') },
  { path: `${base}tech`, name: 'Tech', component: () => import('../views/Tech.vue') },
  { path: `${base}creative`, name: 'Creative', component: () => import('../views/Creative.vue') },
  { path: `${base}share`, name: 'Share', component: () => import('../views/Share.vue') },
  { path: `${base}plant`, name: 'Plant', component: () => import('../views/Plant.vue') },
  { path: `${base}shopping`, name: 'Shopping', component: () => import('../views/Shopping.vue') },
  { path: `${base}page/:id`, name: 'Page', component: () => import('../views/Page.vue') },
  { path: `${base}googleLogin`, name: 'LoginGoogle', component: () => import('../views/LoginGoogle.vue') },
  { path: `${base}bagua`, name: 'Bagua', component: () => import('../views/Bagua.vue') , meta: { noHeader: true } },
   { path: `${base}baguaJp`, name: 'BaguaJp', component: () => import('../views/BaguaJP.vue'), meta: { noHeader: true } },
  { path: `${base}psychic`, name: 'Psychic', component: () => import('../views/Psychic.vue') },
  { path: `${base}googleLogin`, name: 'LoginGoogle', component: () => import('../views/LoginGoogle.vue') },
  { path: `${base}destinyDigits`, name: 'DestinyDigits', component: () => import('../views/DestinyDigits.vue'), meta: { noHeader: true } },
  { path: `${base}destinyDigitsJp`, name: 'DestinyDigitsJp', component: () => import('../views/DestinyDigitsJp.vue'), meta: { noHeader: true } },
  { path: `${base}bazhi`, name: 'Bazhi', component: () => import('../views/Bazhi.vue')},
  { path: `${base}mapGame`, name: 'MapGame', component: () => import('../views/MapGame.vue')},
  { path: `${base}loveDraw`, name: 'LoveDraw', component: () => import('../views/LoveDraw.vue')},
  { path: `${base}loveDrawRoll`, name: 'LoveDrawRoll', component: () => import('../views/LoveDrawRoll.vue')},
  { path: `${base}userImage`, name: 'UserImage', component: () => import('../views/UserImage.vue')},
  { path: `${base}myInfo`, name: 'MyInfo', component: () => import('../views/MyInfo.vue')},
  { path: `${base}xiaoRenGua`, name: 'XiaoRenGua', component: () => import('../views/XiaoRenGua.vue') , meta: { noHeader: true } },
   { path: `${base}xiaoRenGuaJp`, name: 'XiaoRenGuaJp', component: () => import('../views/XiaoRenGuaJp.vue'), meta: { noHeader: true } },
  { path: `${base}mapleSellingSystem`, name: 'MapleSellingSystem', component: () => import('../views/MapleSellingSystem.vue') } 



];

const router = createRouter({
  history: createWebHashHistory(base), // 改為 hash 模式
  routes
});

export default router;
