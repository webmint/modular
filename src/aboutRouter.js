export default {
  path: '/about',
  name: 'about',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: JSON.parse(process.env.VUE_APP_USEA)
    ? () => import(/* webpackChunkName: "moduleA" */ './components/modules/moduleA/ModuleA.vue')
    : () => import(/* webpackChunkName: "about" */ './views/About.vue'),
};
