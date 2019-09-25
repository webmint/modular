<template>
  <v-card>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-text>
      <div
        v-for="(f, i) in fields"
        :key="i"
      >
        <component
          v-if="f.type === 'number'"
          :type="f.type"
          :is="f.component"
          :label="f.label"
          v-model.number="value[f.model]"
          :error="validations.model.model[f.model].$error"
          @blur="validations.model.model[f.model].$touch()"
        />
        <component
          v-else
          :is="f.component"
          :type="f.type"
          :label="f.label"
          v-model="value[f.model]"
          :error="validations.model.model[f.model].$error"
          @blur="validations.model.model[f.model].$touch()"
        />
        <div class="errors red--text">
          <div
            v-for="(v, i) in f.validations"
            :key="i"
          >
            <template v-if="validations.model.model[f.model].$error && !validations.model.model[f.model][v.type]">
              {{ v.message }}
            </template>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
// const { required } = require('vuelidate/lib/validators');

export default {
  name: 'SimpleInputForm',
  props: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    validations: {
      type: Object,
      required: true,
    },
  },
  watch: {
    value() {
      this.$emit('input', this.value);
    },
  },
};
</script>

<style scoped lang="scss">
.errors {
  position: relative;
  top: -22px;
}
</style>
