define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );

  function ColorVisionScreenView() {
    ScreenView.call( this );
  }

  return inherit( ScreenView, ColorVisionScreenView );
} );
