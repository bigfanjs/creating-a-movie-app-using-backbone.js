import $ from 'jquery';
import CollectionView from '../../../../lib/collection-view';
import ItemView from './dashboard-item-view';

export default CollectionView.extend({
  initialize( options ) {
    CollectionView.prototype.initialize.call( this, options );
  },
  tagName: 'tbody',
  MovieItem: ItemView
});