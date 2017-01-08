import BasicModel from '../../../lib/basic-model';

export default BasicModel.extend({
  urlRoot: '/api/movies',
  defaults: {
    title: '',
    genre: '',
    runningTime: '',
    releaseDate: '',
    overview: '',
    director: '',
    boxOffice: '',
    country: '',
    language: '',
    cast: [{
      actor: '',
      character: '',
      avatar: null,
      star: ''
    }],
    meta: {
      dateAdded: '',
      favorites: '',
      watches: ''
    },
    cover: null
  },
  uploadCover: function (blob, options) {
    this.upload(blob, 'cover', options);
  }
});