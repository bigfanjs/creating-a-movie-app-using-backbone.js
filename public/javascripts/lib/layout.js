import Backbone from 'backbone';
import $ from 'jquery';
import forEach from 'lodash/forEach';
import ModelView from './model-view';
import Region from './region';

const
  closeRegions = function ( regions ) {
    forEach(regions, ( name, region ) => {
      if ( region && region.remove ) {
        region.remove();
      }
    });
  },
  configRegions = function () {
    if ( !this._regions ) {
      this._regions = {};
    }

    forEach(this.regions, ( value, name ) => {
      this._regions[ name ] = Region.setup({ elem: value });
    });
  };

export default ModelView.extend({
  render() {
    closeRegions( this.regions );

    // this gonna get changed!
    ModelView.prototype.render.call( this );

    configRegions.call( this );

    return this;
  },
  // gets the region by name.
  getRegion( name ) {
    var region;

    const regions = this._regions || {};

    if ( name === null ) {
      throw TypeError('No name property passed!');
    }

    if ( !regions.hasOwnProperty( name ) ) {
      throw TypeError(`${ name } region doesn't exist in the layout!`);
    }

    region = regions[ name ];

    // console.log( region );
    return region;
  }
});