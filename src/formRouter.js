export default {
  path: '/form',
  name: 'form',
  component: () => import(/* webpackChunkName: "about" */ './components/SimplePage.vue'),
};
