import CollectionView from '../../../../lib/collection-view';
import ItemView from './movie-list-item-view';

export default CollectionView.extend({
  initialize( options ) {
    CollectionView.prototype.initialize.call( this, options );
  },
  className: 'movie-list-view col-xs-8 panel panel-primary',
  MovieItem: ItemView
});