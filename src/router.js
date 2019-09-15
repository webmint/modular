import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import AboutRouter from './aboutRouter';
import SomeRouter from './someRouter';

// const cond = false;

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    AboutRouter,
    SomeRouter,
    // ...(cond ? [AboutRouter] : []),
  ],
});
