import formsConfig from './testConfig';

export default class FormBaseModel { // extends BaseModel
  constructor(configId, v) {
    this.model = {};
    this.errors = [];
    this.vInstance = v;
    this.config = this.getConfig(configId);
  }

  // eslint-disable-next-line class-methods-use-this
  getConfig(param) {
    const asyncGetter = formsConfig;
    this.setModel(asyncGetter);
    return formsConfig;
  }

  setModel(config) {
    config.blocks.forEach((block) => {
      block.fields.forEach((field) => {
        Object.assign(this.model, { [field.model]: '' });
      });
    });
  }

  save(props) {
    this.vInstance.$v.$touch();
    if (!this.vInstance.$v.$invalid) {
      console.log('SAVE', props);
    }
  }

  create(props) {
    console.log('CREATE', props);
  }

  update(props) {
    console.log('UPDATE', props);
  }

  deleteEntity(props) {
    console.log('DELETE', props);
  }

  validate() {
    this.validateStatus = true;
  }
}
