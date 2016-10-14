import MovieCollection from '../../apps/movies/collections/movie-collection';

const assert = chai.assert;

describe('Movie Collection', function () {
  it('has the right url', function () {
    const movieCollection = new MovieCollection();

    assert.match(movieCollection.url, /api\/movies/);
  });
});