<template>
<section>
  <h1>Wrapper</h1>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2>Region 1</h2>
        <component
          v-for="(b, i) in regionOne"
          :key="i"
          :is="b"
          :id="config.blocks.filter(r => r.region === 1)[i].id"
        />
        </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <h2>Region 2</h2>
        <component
          v-for="(b, i) in regionTwo"
          :key="i"
          :is="b"
          :id="config.blocks.filter(r => r.region === 2)[i].id"
        />
      </v-col>
      <v-col cols="6">
        <h2>Region 3</h2>
        <component
          v-for="(b, i) in regionThree"
          :key="i"
          :is="b"
          :id="config.blocks.filter(r => r.region === 3)[i].id"
        />
      </v-col>
    </v-row>
  </v-container>
</section>
</template>

<script>
import axios from '@/plugins/axios';

async function getConfig(name) {
  try {
    const response = await axios.get(name);
    return response;
  } catch (error) {
    console.error(error);
  }
  return '';
}

export default {
  name: 'SomeWrapper',
  // props: {
  //   config: {
  //     type: Object,
  //     default: () => ({}),
  //   },
  // },
  data() {
    return {
      config: {
        blocks: [],
      },
    };
  },
  computed: {
    regionOne() {
      const region = this.config.blocks.filter(b => b.region === 1);
      return region.map(c => () => import(`@/components/modules/${c.path}`));
    },
    regionTwo() {
      const region = this.config.blocks.filter(b => b.region === 2);
      return region.map(c => () => import(`@/components/modules/${c.path}`));
    },
    regionThree() {
      const region = this.config.blocks.filter(b => b.region === 3);
      return region.map(c => () => import(`@/components/modules/${c.path}`));
    },
    blocks() {
      return this.config.blocks.map(c => () => import(`@/components/modules/${c.path}`));
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      getConfig('/pages/some')
        .then((response) => {
          Object.assign(vm, { config: response.data });
          next();
        });
    });
  },
};
</script>

<style scoped>

</style>
