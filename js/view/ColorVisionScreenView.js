define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Image = require( 'SCENERY/nodes/Image' );

  // images
  var mockupImage = require( 'image!COLOR_VISION/mockup1.png' );

  function ColorVisionScreenView() {
    ScreenView.call( this );
    this.addChild( new Image( mockupImage, { centerX: 768/2, centerY: 504/2, scale: 504/mockupImage.height } ) );
  }

  return inherit( ScreenView, ColorVisionScreenView );
} );
