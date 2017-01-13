import CollectionView from '../../../../lib/collection-view';
import ItemView from './movie-viewer-actor';

export default CollectionView.extend({
  ItemView,
  tagName: 'tbody'
});