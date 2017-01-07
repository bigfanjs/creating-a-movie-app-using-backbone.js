import Backbone from 'backbone';
import MovieEditorLayout from '../views/editor/movie-editor-layout';
import MovieEditorForm from '../views/editor/movie-editor-form';
import MovieEditorPreview from '../views/editor/movie-editor-preview';
import MovieEditorCastView from '../views/editor/movie-editor-cast-view';
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
  uploadAvatar = function (character, callback) {
    this.trigger('avatar:upload:start');

    character.uploadAvatar(this.castItem, {
      progress: (length, uploaded, percent) => {
        this.trigger(
          'avatar:upload:progress',
          {length, uploaded, percent}
        );
      },
      success: res => {
        this.trigger('avatar:upload:done');
        callback( res );
      },
      error: err => {
        this.trigger('avatar:upload:fail');
      }
    });
  },
  handleCoverSelect = function ( cover ) {
    this.cover = cover;
  },
  handleAvatarSelect = function ( avatar ) {
    this.avatar = avatar;
  },
  save = function ( movie ) {
    movie.save(null, {
      success: () => {
        if (typeof this.cover !== null) {
          uploadCover.call(this, movie, notify);
          this.cover = null;
        }

        if (typeof this.starringItem !== null) {
          uploadAvatar.call(this, movie, notify);
          this.starringItem = null;
        }

        if (typeof this.castItem !== null) {
          uploadAvatar.call(this, movie, notify);
          this.castItem = null;
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
  addActor = function () {
    this.castCollection.add({});
  },
  deleteActor = function (view, model) {
    this.castCollection.remove( model );
  };

export default {
  setup: function (options = {}) {
    const ctrl = Object.create( this );

    Object.assign(ctrl, Backbone.Events, options);

    return ctrl;
  },
  view: function ( model ) {
    const cast = model.get('cast') || [];

    this.castCollection = new MovieCharCollection( cast );
    const
      layout = new MovieEditorLayout(),
      form = new MovieEditorForm({ model }),
      preview = new MovieEditorPreview({ model }),
      castList = new MovieEditorCastView({
        collection: this.castCollection
      });

    this.region.show( layout );
    layout.getRegion('form').show( form );
    layout.getRegion('preview').show( preview );
    form.getRegion('cast').show( castList );

    this.listenTo(form, 'form:save', bind(save, this));
    this.listenTo(form, 'form:cancel', cancel);
    this.listenTo(form, 'cast:add', bind(addActor, this));

    this.listenTo(castList, 'item:actor:delete', bind(deleteActor, this));

    this.listenTo(preview, 'cover:select', handleCoverSelect);
    this.listenTo(preview, 'avatar:select', handleAvatarSelect);
  },
  destroy: function () {
    this.region.remove();
    this.stopListening();
  }
};