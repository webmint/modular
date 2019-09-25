<template>
  <v-card>
    <v-card-title>
      Module A
    </v-card-title>
    <v-card-text v-if="text">
      Received from server: {{ text }}
    </v-card-text>
  </v-card>
</template>

<script>
import axios from '@/plugins/axios';

export default {
  name: 'ModuleA',
  props: {
    id: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      text: '',
    };
  },
  created() {
    axios.get(`/modules/${this.id}`)
      .then((r) => { this.text = r.data.text; });
  },
};
</script>

<style scoped>

</style>
