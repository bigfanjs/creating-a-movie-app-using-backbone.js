import Backbone from 'backbone';
import MovieEditorLayout from '../views/editor/movie-editor-layout';
import MovieEditorForm from '../views/editor/movie-editor-form';
import MovieEditorPreview from '../views/editor/movie-editor-preview';
import App from '../../../app';

const
  handleAvatarSelect = function ( avatar ) {

  },
  save = function ( movie ) {
    movie.save(null, {
      success: function () {
        
      },
      error: function () {}
    });
  },
  cancel = function () {
    App.router.navigate('admin/dashboard', true);
  };

export default {
  setup: function (options = {}) {
    const ctrl = Object.create( this );

    Object.assign(ctrl, Backbone.Events, options);

    return ctrl;
  },
  view: function ( model ) {
    const
      layout = new MovieEditorLayout(),
      form = new MovieEditorForm(),
      preview = new MovieEditorPreview();

    this.region.show( layout );
    layout.getRegion('form').show( form );
    layout.getRegion('preview').show( preview );

    this.listenTo(form, 'save', save);
    this.listenTo(form, 'cancel', cancel);

    this.listenTo(preview, 'avatar:selected', handleAvatarSelect);
  },
  destroy: function () {
    this.region.remove();
    this.stopListening();
  }
};