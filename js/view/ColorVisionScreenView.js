// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for the first ColorVision screen
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var ColorVisionSlider = require( 'COLOR_VISION/view/ColorVisionSlider' );
  var ColorVisionEllipse = require( 'COLOR_VISION/view/ColorVisionEllipse' );
  var PhotonBeamNode = require( 'COLOR_VISION/view/PhotonBeamNode' );

  // images
  var flashlightDown = require( 'image!COLOR_VISION/flashlight-down.png' );
  var flashlight = require( 'image!COLOR_VISION/flashlight.png' );
  var flashlightUp = require( 'image!COLOR_VISION/flashlight-up.png' );
  var head = require( 'image!COLOR_VISION/head.png' );

  function ColorVisionScreenView( model ) {

    ScreenView.call( this );

    // Add photon beams
    this.redBeam = new PhotonBeamNode( new Bounds2( 0, 0, 280, 50 ), model.redBeam );
    this.redBeam.x = 322;
    this.redBeam.y = 228;
    this.redBeam.rotation = -Math.PI / 6;

    this.greenBeam = new PhotonBeamNode( new Bounds2( 0, 0, 240, 50 ), model.greenBeam );
    this.greenBeam.x = 330;
    this.greenBeam.y = 230;

    this.blueBeam = new PhotonBeamNode( new Bounds2( 0, 0, 280, 50 ), model.blueBeam );
    this.blueBeam.x = 340;
    this.blueBeam.y = 230;
    this.blueBeam.rotation = Math.PI / 6;

    this.addChild( this.redBeam );
    this.addChild( this.greenBeam );
    this.addChild( this.blueBeam );

    // Add flashlights
    var flashlightScale = 0.72;
    var redFlashlight = new Image( flashlightDown, { scale: flashlightScale } );
    var greenFlashlight = new Image( flashlight, { scale: flashlightScale } );
    var blueFlashlight = new Image( flashlightUp, { scale: flashlightScale } );

    var flashlightVBox = new VBox(
      {
        children: [
          redFlashlight,
          greenFlashlight,
          blueFlashlight ],
        spacing: 75,
        right: this.layoutBounds.maxX - 75,
        centerY: this.layoutBounds.centerY
      } );

    this.addChild( flashlightVBox );

    // Add sliders
    var redSlider = new ColorVisionSlider( model.redIntensityProperty, 'red' );
    var greenSlider = new ColorVisionSlider( model.greenIntensityProperty, 'green' );
    var blueSlider = new ColorVisionSlider( model.blueIntensityProperty, 'blue' );

    var sliderVBox = new VBox(
      {
        children: [
          redSlider,
          greenSlider,
          blueSlider ],
        spacing: 22,
        right: this.layoutBounds.maxX - 30,
        centerY: this.layoutBounds.centerY
      } );

    this.addChild( sliderVBox );

    // Add thought bubbles
    this.addChild( new ColorVisionEllipse( model, 225, 60, 53 ) );
    this.addChild( new ColorVisionEllipse( model, 90, 105, 15 ) );
    this.addChild( new ColorVisionEllipse( model, 62, 165, 12 ) );
    this.addChild( new ColorVisionEllipse( model, 50, 220, 7 ) );

    // Add head image
    this.addChild( new Image( head,
      {
        bottom: this.layoutBounds.bottom,
        left: 60,
        scale: 0.7
      } ) );

  }

  return inherit( ScreenView, ColorVisionScreenView,
    {
      step: function( dt ) {
        this.redBeam.step( dt );
        this.greenBeam.step( dt );
        this.blueBeam.step( dt );
      }
    } );
} );
