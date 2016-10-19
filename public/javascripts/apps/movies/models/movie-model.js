import Backbone from 'backbone';

export default Backbone.Model.extend({
  urlRoot: 'api/movies',
  defaults: {
    title: '',
    type: '',
    runningTime: '',
    releaseDate: '',
    featuredSong: '',
    story: '',
    director: '',
    boxOffice: '',
    narrator: '',
    country: '',
    language: '',
    cast: [{actor: '', character: '', avatar: null}],
    starring: [{actor: '', character: '', avatar: null}],
    cover: null
  }
});