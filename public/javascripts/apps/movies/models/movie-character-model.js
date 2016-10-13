import Backbone from 'backbone';

export default Backbone.Model.extend({
  defaults: {
    actor: '',
    character: '',
    avatar: null
  }
});