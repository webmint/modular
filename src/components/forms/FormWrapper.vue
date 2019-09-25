<template>
  <section>
    <h3>{{ formConfig.formTitle }}</h3>
    <template v-for="(b, i) in blocks">
      <component
        :key="i"
        :is="b"
        :id="formConfig.formBlocks[i].blockId"
        :fields="formConfig.formBlocks[i].fields"
        :title="formConfig.formBlocks[i].blockTitle"
        :validate="validate"
        v-model="formData[formConfig.formBlocks[i].blockModel]"
        @checked-validation="setValidationState($event, formConfig.formBlocks[i].blockModel)"
      />
    </template>
  </section>
</template>

<script>
import axios from '@/plugins/axios';
import { EventBus } from '@/eventBus';

export default {
  name: 'FormWrapper',
  props: {
    configName: {
      type: String,
      required: true,
    },
    eventName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formConfig: {},
      formData: {},
      formsInvalid: {},
      validate: false,
      validationCounter: 0,
    };
  },
  computed: {
    blocks() {
      if (this.formConfig.formBlocks && this.formConfig.formBlocks.length) {
        return this.formConfig.formBlocks.map(c => () => import(`@/components/forms/formBlocks/${c.component}`));
      }
      return [];
    },
  },
  watch: {
    validationCounter(newValue) {
      if (newValue === this.formConfig.formBlocks.length) {
        this.validate = false;
        this.validationCounter = 0;
        const errorCheck = this.checkForErrors();
        if (!errorCheck) {
          this.saveForm();
        }
      }
    },
  },
  created() {
    axios.get(this.configName)
      .then((response) => {
        this.formConfig = Object.assign({}, this.formConfig, response.data);
        response.data.formBlocks.forEach((block) => {
          const values = block.fields.reduce((obj, item) => {
            Object.assign(obj, { [item.model]: '' });
            return obj;
          }, {});
          this.$set(this.formData, [block.blockModel], values);
          this.$set(this.formsInvalid, [block.blockModel], false);
        });
      });
    EventBus.$on(this.eventName, () => {
      this.validateForm();
    });
  },
  methods: {
    setValidationState(event, propName) {
      this.formsInvalid[propName] = event;
      this.validationCounter += 1;
    },
    validateForm() {
      this.validate = true;
    },
    checkForErrors() {
      const keys = Object.keys(this.formsInvalid);
      return keys.some(k => this.formsInvalid[k]);
    },
    saveForm() {
      console.log('save!');
    },
  },
};
</script>

<style scoped>

</style>
