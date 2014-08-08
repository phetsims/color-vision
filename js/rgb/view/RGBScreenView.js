// Copyright 2002-2014, University of Colorado Boulder

/**
 * View for the 'RGB' screen
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ColorVisionScreenView = require( 'COLOR_VISION/common/view/ColorVisionScreenView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var RGBSlider = require( 'COLOR_VISION/rgb/view/RGBSlider' );
  var RGBHeadNode = require( 'COLOR_VISION/rgb/view/RGBHeadNode' );
  var RGBPhotonBeamNode = require( 'COLOR_VISION/rgb/view/RGBPhotonBeamNode' );
  var ColorVisionConstants = require( 'COLOR_VISION/ColorVisionConstants' );
  var RGBConstants = require( 'COLOR_VISION/rgb/RGBConstants' );

  // images
  var flashlightDown = require( 'image!COLOR_VISION/flashlight-down.png' );
  var flashlight = require( 'image!COLOR_VISION/flashlight.png' );
  var flashlightUp = require( 'image!COLOR_VISION/flashlight-up.png' );

  // constants
  var BEAM_ANGLE = Math.PI / 6;
  var FLASHLIGHT_SCALE = 0.72;

  /**
   * @param {RGBModel} model
   * @constructor
   */
  function RGBScreenView( model ) {

    ColorVisionScreenView.call( this, model );

    // Add photon beams
    this.redBeam = new RGBPhotonBeamNode( model.redBeam,
      {
        canvasBounds: new Bounds2( 0, 0, RGBConstants.RED_BEAM_LENGTH, ColorVisionConstants.BEAM_HEIGHT ),
        x: 280,
        y: 190,
        rotation: -BEAM_ANGLE
      } );

    this.greenBeam = new RGBPhotonBeamNode( model.greenBeam,
      {
        canvasBounds: new Bounds2( 0, 0, RGBConstants.GREEN_BEAM_LENGTH, ColorVisionConstants.BEAM_HEIGHT ),
        x: 320
      } );
    this.greenBeam.centerY = this.layoutBounds.centerY + ColorVisionConstants.CENTER_Y_OFFSET;

    this.blueBeam = new RGBPhotonBeamNode( model.blueBeam,
      {
        canvasBounds: new Bounds2( 0, 0, RGBConstants.BLUE_BEAM_LENGTH, ColorVisionConstants.BEAM_HEIGHT ),
        x: 320,
        y: 145,
        rotation: BEAM_ANGLE
      } );

    // add head node
    var beamArray = [this.redBeam, this.blueBeam, this.greenBeam];
    var headNode = new RGBHeadNode( model.headModeProperty, this.layoutBounds.bottom, beamArray );
    this.addChild( headNode );

    // Add flashlights
    var redFlashlight = new Image( flashlightDown, { scale: FLASHLIGHT_SCALE } );
    var greenFlashlight = new Image( flashlight, { scale: FLASHLIGHT_SCALE } );
    var blueFlashlight = new Image( flashlightUp, { scale: FLASHLIGHT_SCALE } );

    var flashlightVBox = new VBox(
      {
        children: [
          redFlashlight,
          greenFlashlight,
          blueFlashlight ],
        spacing: 70,
        right: this.layoutBounds.maxX - 75,
        centerY: this.layoutBounds.centerY + ColorVisionConstants.CENTER_Y_OFFSET,
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
        spacing: 15,
        right: this.layoutBounds.maxX - 30,
        centerY: flashlightVBox.centerY
      } );

    this.addChild( sliderVBox );
  }

  return inherit( ColorVisionScreenView, RGBScreenView,
    {
      step: function( dt ) {
        this.redBeam.step( dt );
        this.greenBeam.step( dt );
        this.blueBeam.step( dt );
      }
    } );
} );
