// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for the first ColorVision screen
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
 define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var VBox = require( 'SCENERY/nodes/VBox' );
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

    var redSlider = new ColorVisionSlider( model, 'red' );
    var greenSlider = new ColorVisionSlider( model, 'green' );
    var blueSlider = new ColorVisionSlider( model, 'blue' );

    var vBox = new VBox(
      {
        children: [
          redSlider,
          greenSlider,
          blueSlider ],
        spacing: 22,
        x: 700,
        y: 30
      } );

    this.addChild( vBox );

  }

  return inherit( ScreenView, ColorVisionScreenView );
} );
