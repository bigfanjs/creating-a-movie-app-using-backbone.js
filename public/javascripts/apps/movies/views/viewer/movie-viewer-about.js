import Layout from '../../../../lib/layout';
import App from '../../../../app';
import template from '../../templates/viewer/movie-viewer-about.pug';

export default Layout.extend({
  template,
  className: 'panel panel-simple',
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