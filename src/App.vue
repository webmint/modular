<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { EventBus } from './eventBus';

export default {
  name: 'App',
  data: () => ({
    //
  }),
  methods: {
    saveForm() {
      EventBus.$emit('saveForm');
    },
  },
};
</script>
