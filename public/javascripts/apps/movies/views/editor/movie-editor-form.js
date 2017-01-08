import Layout from '../../../../lib/layout';
import template from '../../templates/editor/movie-editor-form.pug';

var keys;

export default Layout.extend({
  initialize() {
    keys = Object.keys(this.model.attributes);

    keys.splice(keys.indexOf('_id'), 1);
  },
  template,
  className: 'col-xs-12 col-sm-8 col-md-9',
  events: {
    'click #cancel': 'cancel',
    'click #save': 'save',
    'click #new-actor': 'addActor',
  },
  regions: {
    'cast': '#movie-cast-container'
  },
  cancel: function () {
    this.trigger('form:cancel', this.model);
  },
  save: function ( e ) {
    e.preventDefault();

    keys.forEach(key => {
      const input = this.getInput(`#${ key }-input`);

      if (input !== null) {
        this.model.set(key, input);
      }
    });

    this.trigger('form:save', this.model);
  },
  addActor: function () {
    this.trigger('cast:add', true);
  },
  getInput: function ( selector ) {
    const elem = this.$el.find( selector ); 

    if (!elem) {
      return null;
    }

    return elem.val();
  }
});