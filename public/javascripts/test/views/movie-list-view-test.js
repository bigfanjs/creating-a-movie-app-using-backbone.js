import MovieList from '../../apps/movies/views/list/movie-list-view';

const assert = chai.assert;

describe('Movie List View', function () {
  it('has the right className', function () {
    const view = new MovieList();

    assert.equal(view.className, 'movie-list-view');
  });
});