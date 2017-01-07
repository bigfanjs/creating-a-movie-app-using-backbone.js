import BasicModel from '../../../lib/basic-model';

export default BasicModel.extend({
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