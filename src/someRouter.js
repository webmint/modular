const config = {
  blocks: [
    {
      name: 'ModuleA',
      path: 'moduleA/ModuleA',
    },
    {
      name: 'ModuleB',
      path: 'moduleB/ModuleB',
    },
  ],
};

export default {
  path: '/some',
  name: 'some',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ './components/SomeWrapper.vue'),
  props: { config },
};
