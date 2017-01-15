import BasicModel from '../../../lib/basic-model';

export default BasicModel.extend({
  urlRoot: '/api/movies',
  defaults: {
    title: '',
    genre: '',
    runningTime: '',
    releaseDate: {
      month: '',
      day: '',
      year: ''
    },
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
  validation: {
    title: {
      required: true,
      minLength: 1
    },
    overview: {
      required: true,
      maxLength: 124,
      minLength: 60
    },
    genre: {
      required: true
    },
    runningTime: {
      required: true,
      max: 200,
      min: 30
    },
    releaseDate: [
      {
        required: true,
        msg: 'release date is required'
      },
      {
        pattern: 'date',
        msg: 'invalid date'
      }
    ],
    language: {
      required: true
    },
    country: {
      required: true
    }
  },
  uploadCover: function (blob, options) {
    this.upload(blob, 'cover', options);
  },
  uploadAvatars: function (blobs, options) {
    this.upload(blobs, 'avatars', options);
  }
});