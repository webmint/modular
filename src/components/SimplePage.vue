<template>
  <section>
    <v-toolbar>
      <v-btn
        class="primary"
        @click="model.save()"
      >
        Save
      </v-btn>
    </v-toolbar>
    <template v-for="(b, i) in blocks">
      <component
        :key="i"
        :is="b"
        :id="model.config.blocks[i].id"
        :fields="model.config.blocks[i].fields"
        :title="model.config.blocks[i].title"
        :validations="$v"
        v-model="model.model"
        @checked-validation="setValidationState($event, model.config.blocks[i].model)"
      />
    </template>
  </section>
</template>

<script>
import Model from '@/FormBaseModel';

const validators = require('vuelidate/lib/validators');

export default {
  name: 'SimplePage',
  data() {
    return {
      model: new Model(1, this),
    };
  },
  computed: {
    blocks() {
      if (this.model.config.blocks && this.model.config.blocks.length) {
        return this.model.config.blocks.map(c => () => import(`@/components/forms/formBlocks/${c.component}`));
      }
      return [];
    },
  },
  validations() {
    const result = {
      model: {
        model: {},
      },
    };
    this.model.config.blocks.forEach((block) => {
      block.fields.forEach((field) => {
        if (!field.validations || !field.validations.length) {
          Object.assign(result.model.model, { [field.model]: '' });
        } else {
          field.validations.forEach((validation) => {
            switch (validation.type) {
              case ('minLength'):
                Object.assign(
                  result.model.model,
                  {
                    [field.model]: { [validation.type]: validators.minLength(validation.argument) },
                  },
                );
                break;
              case ('maxLength'):
                Object.assign(
                  result.model.model,
                  {
                    [field.model]: { [validation.type]: validators.maxLength(validation.argument) },
                  },
                );
                break;
              case ('minValue'):
                Object.assign(
                  result.model.model,
                  {
                    [field.model]: { [validation.type]: validators.maxLength(validation.argument) },
                  },
                );
                break;
              case ('maxValue'):
                Object.assign(
                  result.model.model,
                  {
                    [field.model]: { [validation.type]: validators.maxLength(validation.argument) },
                  },
                );
                break;
              case ('between'):
                Object.assign(
                  result.model.model,
                  {
                    [field.model]: {
                      [validation.type]: validators.between(validation.argument[0], validation.argument[1]),
                    },
                  },
                );
                break;
              default:
                Object.assign(
                  result.model.model,
                  { [field.model]: { [validation.type]: validators[validation.type] } },
                );
                break;
            }
          });
        }
      });
    });
    return result;
  },
};
</script>

<style scoped>

</style>
