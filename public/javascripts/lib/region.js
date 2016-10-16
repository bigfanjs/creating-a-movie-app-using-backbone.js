import $ from 'jquery';
import isFunction from 'lodash/isFunction';

const
    // removes a view from the DOM.
  close = function () {
    var view;

    if ( ( view = this.currView ) && view.remove ) {
      view.remove();
    }
  },
  open = function ( view ) {
    if ( !this.$elem ) {
      this.$elem = $( this.elem );
    }

    this.$elem.html( view.render().elem );
  };

export default {
  // instantiates the Region Object.
  setup( options, init ) {
    const region = Object.assign(
      Object.create( this ),
      options
    );

    if ( isFunction( init ) ) {
      init.call( region );
    }

    return region;
  },
  /*
    removes the current view in the region and
    opens a new one.
  */
  show( view ) {
    close.call( this );
    open.call( this, this.currView = view );
  }
};