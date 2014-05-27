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
  var ColorVisionEllipse = require( 'COLOR_VISION/common/view/ColorVisionEllipse' );
  var PhotonBeamNode = require( 'COLOR_VISION/rgb/view/PhotonBeamNode' );
  var Constants = require( 'COLOR_VISION/ColorVisionConstants' );

  // images
  var flashlightDown = require( 'image!COLOR_VISION/flashlight-down.png' );
  var flashlight = require( 'image!COLOR_VISION/flashlight.png' );
  var flashlightUp = require( 'image!COLOR_VISION/flashlight-up.png' );
  var headFront = require ( 'image!COLOR_VISION/head-front.png' );
  var headBack = require ( 'image!COLOR_VISION/head.png' );

  /**
   * @param {RGBModel} model
   * @constructor
   */
  function RGBScreenView( model ) {

    ScreenView.call( this, { renderer: 'svg' } );

    // Add back head image
    this.addChild( new HeadNode( headBack, this.layoutBounds.bottom + Constants.CENTER_Y_OFFSET ) );

    // Add photon beams
    this.redBeam = new PhotonBeamNode( new Bounds2( 0, 0, Constants.RED_BEAM_LENGTH, Constants.BEAM_HEIGHT ), model.redBeam,
      {
        x: 280,
        y: 190,
        rotation: -Constants.FLASHLIGHT_ANGLE
      } );

    this.greenBeam = new PhotonBeamNode( new Bounds2( 0, 0, Constants.GREEN_BEAM_LENGTH, Constants.BEAM_HEIGHT ), model.greenBeam,
      {
        x: 320,
      } );
    this.greenBeam.centerY = this.layoutBounds.centerY + Constants.CENTER_Y_OFFSET;

    this.blueBeam = new PhotonBeamNode( new Bounds2( 0, 0, Constants.BLUE_BEAM_LENGTH, Constants.BEAM_HEIGHT ), model.blueBeam,
      {
        x: 320,
        y: 145,
        rotation: Constants.FLASHLIGHT_ANGLE
      } );

    this.addChild( this.redBeam );
    this.addChild( this.greenBeam );
    this.addChild( this.blueBeam );

    // Add front head image (the photons are sandwiched between two head images to get the cutoff point looking right)
    this.addChild( new HeadNode( headFront, this.layoutBounds.bottom + Constants.CENTER_Y_OFFSET ) );

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
        spacing: 70,
        right: this.layoutBounds.maxX - 75,
        centerY: this.layoutBounds.centerY + Constants.CENTER_Y_OFFSET,
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

    // Add 'Reset All' button
    var resetAllButton = new ResetAllButton(
      {
        listener: function() { model.reset(); },
        bottom: this.layoutBounds.bottom - 5,
        right: sliderVBox.right,
        radius: 18
      } );

    this.addChild( resetAllButton );

    // for moving the thought bubbles together as a group
    var thoughtBubbleX = -15;
    var thoughtBubbleY = -10;

    // Add thought bubbles
    this.addChild( new ColorVisionEllipse( model, 220 + thoughtBubbleX, 60  + thoughtBubbleY, 45 ) );
    this.addChild( new ColorVisionEllipse( model, 90  + thoughtBubbleX, 105 + thoughtBubbleY, 15 ) );
    this.addChild( new ColorVisionEllipse( model, 62  + thoughtBubbleX, 165 + thoughtBubbleY, 12 ) );
    this.addChild( new ColorVisionEllipse( model, 50  + thoughtBubbleX, 220 + thoughtBubbleY,  7 ) );

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
