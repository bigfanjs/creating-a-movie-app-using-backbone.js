import Backbone from 'backbone';
import MovieCharacter from '../models/movie-character-model';

// a collection of character models.
export default Backbone.Collection.extend({
  model: MovieCharacter
});