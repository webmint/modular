<template>
<section>
  <h1>Wrapper</h1>
  <component
    :is="test"
  />
  <component
    v-for="(b, i) in blocks"
    :key="i"
    :is="b"
  />
</section>
</template>

<script>
export default {
  name: 'SomeWrapper',
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    blocks() {
      return this.config.blocks.map(c => () => import(`@/components/modules/${c.path}`));
    },
  },
};
</script>

<style scoped>

</style>
