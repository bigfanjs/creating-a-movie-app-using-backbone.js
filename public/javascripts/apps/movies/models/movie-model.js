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
    budget: '',
    country: '',
    language: '',
    cast: [{
      actor: '',
      character: '',
      star: '',
      gender: '',
      avatar: null,
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
  },
  uploadAvatars: function (blobs, options) {
    this.upload(blobs, 'avatars', options);
  }
});