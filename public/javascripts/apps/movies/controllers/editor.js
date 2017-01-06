import Backbone from 'backbone';
import MovieEditorLayout from '../views/editor/movie-editor-layout';
import MovieEditorForm from '../views/editor/movie-editor-form';
import MovieEditorPreview from '../views/editor/movie-editor-preview';
import MovieEditorCastView from '../views/editor/movie-editor-cast-view';
import MovieEditorStarringView from '../views/editor/movie-editor-starring-view';
import MovieCharCollection from '../collections/movie-char-collection';
import bind from 'lodash/bind';
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
  },
  addCastItem = function () {
    this.castCollection.add({});
  },
  addStarringItem = function () {
    this.starringCollection.add({});
  },
  deleteCastItem = function (view, model) {
    this.castCollection.remove( model );
  },
  deleteStarringItem = function (view, model) {
    this.starringCollection.remove( model );
  };

export default {
  setup: function (options = {}) {
    const ctrl = Object.create( this );

    Object.assign(ctrl, Backbone.Events, options);

    return ctrl;
  },
  view: function ( model ) {
    const
      cast = model.get('cast') || [],
      starring = model.get('starring') || [];

    this.castCollection = new MovieCharCollection( cast );
    this.starringCollection = new MovieCharCollection( starring );

    const
      layout = new MovieEditorLayout(),
      form = new MovieEditorForm({ model }),
      preview = new MovieEditorPreview({ model }),
      castList = new MovieEditorCastView({
        collection: this.castCollection
      }),
      starringList = new MovieEditorStarringView({
        collection: this.starringCollection
      });

    this.region.show( layout );
    layout.getRegion('form').show( form );
    layout.getRegion('preview').show( preview );
    form.getRegion('cast').show( castList );
    form.getRegion('starring').show( starringList );

    this.listenTo(form, 'form:save', bind(save, this));
    this.listenTo(form, 'form:cancel', cancel);
    this.listenTo(form, 'cast:add', bind(addCastItem, this));
    this.listenTo(form, 'starring:add', bind(addStarringItem, this));

    this.listenTo(castList, 'item:actor:delete', bind(deleteCastItem, this));
    this.listenTo(starringList, 'item:actor:delete', bind(deleteStarringItem, this));

    this.listenTo(preview, 'avatar:selected', handleCoverSelect);
  },
  destroy: function () {
    this.region.remove();
    this.stopListening();
  }
};