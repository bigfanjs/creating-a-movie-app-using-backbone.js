import MovieCharacter from '../../apps/movies/models/movie-character-model';

const assert = chai.assert;

// testing the movie character model.
describe('Movie Character', function () {
  it('has the default values', function () {
    const movieCharacter = new MovieCharacter();

    assert.equal(movieCharacter.get('actor'), '');
    assert.equal(movieCharacter.get('character'), '');
    assert.isNull(movieCharacter.get('avatar'));
  });
});