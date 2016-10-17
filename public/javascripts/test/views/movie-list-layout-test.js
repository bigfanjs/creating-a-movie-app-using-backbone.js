import MovieListLatout from '../../apps/movies/views/list/movie-list-layout.js';

const assert = chai.assert;

describe('Movie List Layout', function () {
  beforeEach(function () {
    this.layout = new MovieListLatout();
  });

  it('has the right regions', function () {
    const regions = {
      filters: '.filter-bar-container',
      list: '.movie-list-view'
    };

    assert.deepEqual( this.layout.regions, regions);
  });

  it('has the right class name', function () {
    assert.match(this.layout.className, /^row\spage-container/);
  });

  it('has the right template', function () {
    assert.typeOf(this.layout.template, 'function');
  });
});