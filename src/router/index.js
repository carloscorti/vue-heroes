import Vue from 'vue';
import VueRouter from 'vue-router';

import PageNotFound from '@/views/page-not-found.vue';

Vue.use(VueRouter);

const parseId = route => ({ id: parseInt(route.params.id) });

const routes = [
  {
    path: '/',
    redirect: '/heroes',
  },
  {
    path: '/heroes',
    name: 'heroes',
    component: () =>
      import(/* webpackChunkName: "bundle.heroes" */ '../views/heroesList.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "bundle.about" */ '@/views/about.vue'),
  },
  {
    path: '/heroes/:id',
    name: 'detail',
    props: parseId,
    component: () =>
      import(/* webpackChunkName: "bundle.heroes-details" */ '../views/hero-detail.vue'),
  },
  {
    path: '*',
    name: 'page-not-found',
    component: PageNotFound,
  },
];

// eslint-disable-next-line no-new
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
