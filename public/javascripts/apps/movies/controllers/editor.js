import Backbone from 'backbone';
import MovieEditorLayout from '../views/editor/movie-editor-layout';
import MovieEditorForm from '../views/editor/movie-editor-form';
import MovieEditorPreview from '../views/editor/movie-editor-preview';
import App from '../../../app';

const
  notify = function () {
    App.notify();
    App.router.navigate('admin/dashboard', true);
  },
  uploadCover = function (movie, callback) {
    this.trigger('cover:upload:start');

    movie.uploadCover(this.cover, {
      progress: (length, uploaded, percent) => {
        this.trigger(
          'cover:upload:progress',
          {length, uploaded, percent}
        );
      },
      success: res => {
        this.trigger('cover:upload:done');
        callback( res );
      },
      error: err => {
        this.trigger('cover:upload:fail');
      }
    });
  },
  handleCoverSelect = function ( cover ) {
    this.cover = cover;
  },
  save = function ( movie ) {
    movie.save(null, {
      success: () => {
        if (typeof this.cover !== null) {
          uploadCover.call(this, movie, notify);
          this.cover = null;
        }
      },
      error: () => {
        console.log('Failed saving movie to the server');
      }
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

    this.listenTo(preview, 'avatar:selected', handleCoverSelect);
  },
  destroy: function () {
    this.region.remove();
    this.stopListening();
  }
};