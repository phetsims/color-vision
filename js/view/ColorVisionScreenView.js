define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var ColorVisionSlider = require( 'COLOR_VISION/view/ColorVisionSlider' );

  // images
  var mockupImage = require( 'image!COLOR_VISION/mockup1.png' );

  function ColorVisionScreenView( model ) {
    ScreenView.call( this );
    this.addChild( new Image( mockupImage, {
      centerX: ScreenView.DEFAULT_LAYOUT_BOUNDS.centerX,
      centerY: ScreenView.DEFAULT_LAYOUT_BOUNDS.centerY,
      scale: ScreenView.DEFAULT_LAYOUT_BOUNDS.height / mockupImage.height,
      opacity: 0.5
    } ) );

    // var vBox = new VBox( )

    var slider = new ColorVisionSlider( model );
    this.addChild( slider );
  }

  return inherit( ScreenView, ColorVisionScreenView );
} );
