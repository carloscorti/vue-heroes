import Vue from 'vue';
import VueRouter from 'vue-router';

import HeroesList from '@/views/heroesList.vue';
import About from '@/views/about.vue';
import HeroDetail from '@/views/hero-detail.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/heroes',
  },
  {
    path: '/heroes',
    name: 'heroes',
    component: HeroesList,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/heroes/:id',
    name: 'detail',
    props: route => ({ id: parseInt(route.params.id) }),
    component: HeroDetail,
  },
];

// eslint-disable-next-line no-new
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
