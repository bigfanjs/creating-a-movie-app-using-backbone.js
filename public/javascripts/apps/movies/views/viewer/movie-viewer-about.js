import values from 'lodash/values';
import Layout from '../../../../lib/layout';
import App from '../../../../app';
import template from '../../templates/viewer/movie-viewer-about.pug';

export default Layout.extend({
  initialize() {
    const
      attr = 'releaseDate',
      date = Object.keys(this.model.get(attr));

    this.bindings = {
      '#release-date': {
        observe: attr,
        onGet: function ( obj ) {
          const vals = values( obj );
          return vals.join('/');
        }
      }
    };
  },
  template,
  className: 'col-xs-12 col-sm-8 col-md-9',
  regions: {
    cast: '.cast-list-container',
    starring: '.starring-list-container',
  },
  events: {
    'click #back': 'back',
    'click #watch-movie': 'watchMovie',
    'click #watch-trailer': 'watchTrailer',
    'click #like': 'like',
    'click #dislike': 'dislike'
  },
  back() {
    App.router.navigate('movies', true);
  },
  watchMovie() {
    // handle movie watching here.
  },
  watchTrailer() {
    // handle trailer watching here.
  },
  like() {
    this.trigger('movie:like', this.model);
  },
  dislike() {
    this.trigger('movie:dislike', this.model);
  },
});