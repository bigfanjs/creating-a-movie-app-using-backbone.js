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
  uploadCover = function (movie) {
    this.trigger('cover:upload:start');

    const promise = new Promise((resolve, reject) => {
      movie.uploadCover(this.cover, {
        progress: (length, uploaded, percent) => {
          this.trigger(
            'cover:upload:progress',
            {length, uploaded, percent}
          );
        },
        success: response => {
          this.trigger('cover:upload:done');
          resolve( response );
        },
        error: err => {
          this.trigger('cover:upload:fail');
          reject( err );
        }
      });
    });

    return promise;
  },
  uploadAvatars = function (movie) {
    this.trigger('avatars:upload:start');

    const promise = new Promise((resolve, reject) => {
      movie.uploadAvatars(this.avatars, {
        progress: (length, uploaded, percent) => {
          this.trigger(
            'avatars:upload:progress',
            {length, uploaded, percent}
          );
        },
        success: response => {
          this.trigger('avatars:upload:done');
          resolve( response );
        },
        error: err => {
          this.trigger('avatars:upload:fail');
          reject( err );
        }
      });      
    });

    return promise;
  },
  handleCoverSelect = function ( cover ) {
    this.cover = cover;
  },
  handleAvatarSelect = function (avatar, id) {
    this.avatars[ id ] = avatar;
  },
  save = function ( movie ) {
    if (!movie.isValid(true)) {
      console.error('Movie is not valid!');
      return;
    }

    const valids = this.castCollection.map(model => {
      return model.isValid(true);
    });

    if (valids.includes(false)) {
      console.error('Cast is not valid!');
      return;
    }

    const cast = this.castCollection.toJSON();

    movie.set({ cast });

    movie.save(null, {
      success: () => {
        let promises = [];

        if (this.avatars.length !== 0) {
          promises.push(uploadAvatars.call(this, movie));
          this.avatar = [];
        }

        if (typeof this.cover !== null) {
          promises.push(uploadCover.call(this, movie));
          this.cover = null;
        }

        Promise
          .all(promises)
          .then(notify, function ( err ) {
            console.log( err );
          });
      },
      error: err => {
        console.log('Failed saving movie to the server', err);
      }
    });
  },
  cancel = function () {
    App.router.navigate('admin/dashboard', true);
  },
  addActor = function () {
    this.castCollection.add({});
  },
  deleteActor = function (view, model, index) {
    const avatars = this.avatars;

    avatars.splice(avatars.indexOf(index), 1);

    this.castCollection.remove( model );
  };

export default {
  setup: function (options = {}) {
    const ctrl = Object.create( this );

    ctrl.avatars = [];

    Object.assign(ctrl, Backbone.Events, options);

    return ctrl;
  },
  view: function ( movie ) {
    const cast = movie.get('cast') || [];

    this.castCollection = new MovieCharCollection( cast );

    const
      layout = new MovieEditorLayout(),
      form = new MovieEditorForm({model: movie}),
      preview = new MovieEditorPreview({model: movie}),
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

    this.listenTo(
      castList,
      'item:actor:delete',
      bind(deleteActor, this)
    );

    this.listenTo(
      castList,
      'item:avatar:select',
      bind(handleAvatarSelect, this)
    );

    this.listenTo(preview, 'cover:select', handleCoverSelect);
  },
  destroy: function () {
    this.region.remove();
    this.stopListening();
  }
};