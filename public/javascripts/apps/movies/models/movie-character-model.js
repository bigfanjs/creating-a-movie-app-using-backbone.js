import BasicModel from '../../../lib/basic-model';

export default BasicModel.extend({
  defaults: {
    actor: '',
    character: '',
    starring: '',
    avatar: null
  },
  uploadAvatar: function (blob, options) {
    this.upload(blob, 'avatar', options);
  }
});