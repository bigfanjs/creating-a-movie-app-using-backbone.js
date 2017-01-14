import BasicModel from '../../../lib/basic-model';

export default BasicModel.extend({
  defaults: {
    actor: '',
    character: '',
    star: '',
    gender: '',
    avatar: null
  },
  validation: {
    actor: {
      required: true
    },
    character: {
      required: true
    },
    gender: {
      required: true,
      msg: 'Select a gender'
    }
  }
});