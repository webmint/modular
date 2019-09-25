<template>
  <v-card>
    <v-card-title>
      {{ formTitle }}
    </v-card-title>
    <v-card-text>
      <div
        class="green--text"
        v-if="submitMessage"
      >
        {{ submitMessage }}
      </div>
      <div
        v-for="(f, i) in fields"
        :key="i"
      >
        <component
          v-if="f.type === 'number'"
          :type="f.type"
          :is="f.component"
          :label="f.label"
          v-model.number="formData[f.model]"
          :error="$v.formData[f.model].$error"
          @blur="$v.formData[f.model].$touch()"
        />
        <component
          v-else
          :is="f.component"
          :type="f.type"
          :label="f.label"
          v-model="formData[f.model]"
          :error="$v.formData[f.model].$error"
          @blur="$v.formData[f.model].$touch()"
        />
        <div class="errors red--text">
          <div
            v-for="(v, i) in f.validations"
            :key="i"
          >
            <template v-if="$v.formData[f.model].$error && !$v.formData[f.model][v.type]">
             {{ v.message }}
            </template>
          </div>
        </div>
      </div>
      <v-btn
        v-if="submittable"
        color="primary"
        @click="submit()"
      >
        Submit
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from '@/plugins/axios';

const { required, minLength } = require('vuelidate/lib/validators');

export default {
  name: 'ModuleB',
  props: {
    id: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      formTitle: '',
      formData: {
      },
      fields: [],
      submitUrl: '',
      fetchData: false,
      submittable: false,
      submitMessage: '',
      parsed: false,
    };
  },
  created() {
    axios.get(`/modules/${this.id}`)
      .then((r) => {
        this.formTitle = r.data.formTitle;
        this.fields = r.data.fields;
        this.submitUrl = r.data.submitUrl;
        this.fetchData = r.data.fetchData;
        this.submittable = r.data.submittable;
        r.data.fields.forEach((field) => {
          this.$set(this.formData, [field.model], '');
        });
      });
  },
  methods: {
    submit() {
      this.$v.formData.$touch();
      if (!this.$v.formData.$invalid) {
        axios.post(this.submitUrl, this.formData)
          .then((r) => { this.submitMessage = r.data; });
      }
    },
  },
  validations() {
    const result = {
      formData: {},
    };
    this.fields.forEach((f) => {
      Object.assign(result.formData, { [f.model]: {} });
      f.validations.forEach(v => {
        if (v.type === 'required') {
          Object.assign(result.formData[f.model], { required });
        }
        if (v.type === 'minLength') {
          Object
            .assign(result.formData[f.model],
              { minLength: minLength([v.argument]) });
        }
      });
    });
    return result;
  },
};
</script>

<style scoped lang="scss">
.errors {
  position: relative;
  top: -22px;
}
</style>
