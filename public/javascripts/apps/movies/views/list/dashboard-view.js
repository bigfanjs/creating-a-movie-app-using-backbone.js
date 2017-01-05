import $ from 'jquery';
import CollectionView from '../../../../lib/collection-view';
import ItemView from './dashboard-item-view';

export default CollectionView.extend({
  tagName: 'tbody',
  ItemView
});