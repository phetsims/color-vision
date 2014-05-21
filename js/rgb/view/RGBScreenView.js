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
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var RGBSlider = require( 'COLOR_VISION/rgb/view/RGBSlider' );
  var HeadNode = require( 'COLOR_VISION/common/view/HeadNode' );
  var ColorVisionEllipse = require( 'COLOR_VISION/rgb/view/ColorVisionEllipse' );
  var PhotonBeamNode = require( 'COLOR_VISION/rgb/view/PhotonBeamNode' );
  var Constants = require( 'COLOR_VISION/ColorVisionConstants' );

  // images
  var flashlightDown = require( 'image!COLOR_VISION/flashlight-down.png' );
  var flashlight = require( 'image!COLOR_VISION/flashlight.png' );
  var flashlightUp = require( 'image!COLOR_VISION/flashlight-up.png' );

  /**
   * @param {RGBModel} model
   * @constructor
   */
  function RGBScreenView( model ) {

    ScreenView.call( this, { renderer: 'svg' } );

    // Add photon beams
    this.redBeam = new PhotonBeamNode( new Bounds2( 0, 0, Constants.RED_BEAM_LENGTH, Constants.BEAM_HEIGHT ), model.redBeam,
      {
        x: 280,
        y: 205,
        rotation: -Math.PI / 6
      } );

    this.greenBeam = new PhotonBeamNode( new Bounds2( 0, 0, Constants.GREEN_BEAM_LENGTH, Constants.BEAM_HEIGHT ), model.greenBeam,
      {
        x: 330,
      } );
    this.greenBeam.centerY = this.layoutBounds.centerY;

    this.blueBeam = new PhotonBeamNode( new Bounds2( 0, 0, Constants.BLUE_BEAM_LENGTH, Constants.BEAM_HEIGHT ), model.blueBeam,
      {
        x: 320,
        y: 172,
        rotation: Math.PI / 6
      } );

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
    var redSlider = new RGBSlider( model.redIntensityProperty, 'red' );
    var greenSlider = new RGBSlider( model.greenIntensityProperty, 'green' );
    var blueSlider = new RGBSlider( model.blueIntensityProperty, 'blue' );

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
    this.addChild( new ColorVisionEllipse( model, 50, 220,  7 ) );

    // Add head image
    this.addChild( new HeadNode( this.layoutBounds.bottom ) );

    // Add 'Reset All' button, resets the sim to its initial state
    var resetAllButton = new ResetAllButton(
      {
        listener: function() { model.reset(); },
        bottom: this.layoutBounds.bottom - 15
      } );

    this.addChild( resetAllButton );

  }

  return inherit( ScreenView, RGBScreenView,
    {
      step: function( dt ) {
        this.redBeam.step( dt );
        this.greenBeam.step( dt );
        this.blueBeam.step( dt );
      }
    } );
} );
