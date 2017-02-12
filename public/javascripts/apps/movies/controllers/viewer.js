/* Proxyquireify forces us to write CommonJS modules */

// const
//   Backbone = require('backbone'),
//   MovieViewerLayout = require('../views/viewer/movie-viewer-layout'),
//   MovieViewerWidget = require('../views/viewer/movie-viewer-widget'),
//   MovieViewerAbout = require('../views/viewer/movie-viewer-about');

import Backbone from 'backbone';
import bind from 'lodash/bind';
import MovieViewerLayout from '../views/viewer/movie-viewer-layout';
import MovieViewerWidget from '../views/viewer/movie-viewer-widget';
import MovieViewerAbout from '../views/viewer/movie-viewer-about';
import MovieCharCollection from '../collections/movie-char-collection';
import MovieCastView from '../views/viewer/movie-viewer-cast-view';

const
  movieLiked = function ( model ) {

  },
  movieDisliked = function ( model ) {

  };

module.exports = {
  setup: function ( options ) {
    const ctrl = Object.create( this );

    Object.assign(ctrl, Backbone.Events, options);

    return ctrl;
  },
  view(movie, selectedPage) {
    const
      cast = movie.get('cast') || [],
      starring = cast.filter(actor => actor.star);

    this.castCollection = new MovieCharCollection( cast );
    this.starringCollection = new MovieCharCollection( starring );

    const
      layout = new MovieViewerLayout(),
      widget = new MovieViewerWidget({ model: movie }),
      about = new MovieViewerAbout({model: movie, selectedPage}),
      castList = new MovieCastView({
        collection: this.castCollection
      }),
      starringList = new MovieCastView({
        collection: this.starringCollection
      });

    this.region.show( layout );
    layout.getRegion('widget').show( widget );
    layout.getRegion('about').show( about );
    about.getRegion('cast').show(castList, true);
    about.getRegion('starring').show(starringList, true);

    this.listenTo(about, 'movie:like', bind(movieLiked, this));
    this.listenTo(about, 'movie:dislike', bind(movieDisliked, this));
  },
  destroy() {
    this.region.remove();
    this.stopListening();
  }
};