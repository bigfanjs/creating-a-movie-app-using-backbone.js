import MovieModel from '../../apps/movies/models/movie-model';

const assert = chai.assert;

// testing the movie model.
describe('Movie Model', function () {

  // making sure all default values are empty strings.
  describe('default values', function () {
    const movieModel = new MovieModel();

    it('should have the default values', function () {
      assert.equal(movieModel.get('name'), '');
      assert.equal(movieModel.get('type'), '');
      assert.equal(movieModel.get('runningTime'), '');
      assert.equal(movieModel.get('releaseDate'), '');
      assert.equal(movieModel.get('featuredSong'), '');
      assert.equal(movieModel.get('story'), '');
      assert.equal(movieModel.get('director'), '');
      assert.equal(movieModel.get('boxOffice'), '');
      assert.equal(movieModel.get('narrator'), '');
      assert.equal(movieModel.get('country'), '');
      assert.equal(movieModel.get('language'), '');
      assert.equal(movieModel.get('avatar'), null);
      assert.deepEqual(
        movieModel.get('cast')[ 0 ],
        { actor: '', character: '', avatar: null }
      );
      assert.deepEqual(
        movieModel.get('starring')[ 0 ],
        { actor: '', character: '', avatar: null }
      );
    });
    it('has the right Url', function () {
      assert.match(movieModel.url(), /api\/movies/);
    });
  });
});