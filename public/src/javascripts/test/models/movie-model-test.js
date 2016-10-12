import MovieModel from '../../apps/movies/models/movie-model';

const
  movieModel = new MovieModel(),
  assert = chai.assert;

// making sure all default values are empty string.
describe('defaults', function () {
  it('should be empty', function () {
    assert.equal(movieModel.get('name'), '');
    assert.equal(movieModel.get('type'), '');
  });
});