
export default {
  path: '/some',
  name: 'some',
  component: () => import(/* webpackChunkName: "about" */ './components/SomeWrapper.vue'),
};
