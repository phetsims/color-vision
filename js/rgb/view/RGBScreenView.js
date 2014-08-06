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
  var ScreenView = require( 'JOIST/ScreenView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var PlayPauseButton = require( 'SCENERY_PHET/PlayPauseButton' );
  var StepButton = require( 'SCENERY_PHET/StepButton' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var RGBSlider = require( 'COLOR_VISION/rgb/view/RGBSlider' );
  var HeadNode = require( 'COLOR_VISION/common/view/HeadNode' );
  var addThoughtBubbles = require( 'COLOR_VISION/common/view/addThoughtBubbles' );
  var RGBPhotonBeamNode = require( 'COLOR_VISION/rgb/view/RGBPhotonBeamNode' );
  var HeadToggleNode = require( 'COLOR_VISION/common/view/HeadToggleNode' );
  var ColorVisionConstants = require( 'COLOR_VISION/ColorVisionConstants' );
  var RGBConstants = require( 'COLOR_VISION/rgb/RGBConstants' );

  // images
  var flashlightDown = require( 'image!COLOR_VISION/flashlight-down.png' );
  var flashlight = require( 'image!COLOR_VISION/flashlight.png' );
  var flashlightUp = require( 'image!COLOR_VISION/flashlight-up.png' );
  var headBack = require( 'image!COLOR_VISION/head-with-brain.png' );
  var headFront = require( 'image!COLOR_VISION/head-front-with-brain.png' );
  var headNoBrain = require( 'image!COLOR_VISION/head-no-brain.png' );
  var headFrontNoBrain = require( 'image!COLOR_VISION/head-front-no-brain.png' );

  // constants
  var BEAM_ANGLE = Math.PI / 6;
  var FLASHLIGHT_SCALE = 0.72;

  /**
   * @param {RGBModel} model
   * @constructor
   */
  function RGBScreenView( model ) {

    ScreenView.call( this, { renderer: 'svg' } );

    // Add back head image
    var headBackNode = new HeadNode( headBack, this.layoutBounds.bottom );
    this.addChild( headBackNode );

    var headBackNoBrainNode = new HeadNode( headNoBrain, this.layoutBounds.bottom );
    this.addChild( headBackNoBrainNode );

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

    this.addChild( this.redBeam );
    this.addChild( this.greenBeam );
    this.addChild( this.blueBeam );

    // Add front head image (the photons are sandwiched between two head images to get the cutoff point looking right)
    var headFrontNode = new HeadNode( headFront, this.layoutBounds.bottom );
    this.addChild( headFrontNode );

    var headFrontNoBrainNode = new HeadNode( headFrontNoBrain, this.layoutBounds.bottom );
    this.addChild( headFrontNoBrainNode );

    // Make sure only one image is visible at at time, depending on the user's selection
    model.headModeProperty.link( function( mode ) {
      headBackNode.visible = ( mode === 'brain' );
      headBackNoBrainNode.visible = ( mode === 'no-brain' );
      headFrontNode.visible = ( mode === 'brain' );
      headFrontNoBrainNode.visible = ( mode === 'no-brain' );
    } );

    // Add head mode toggle
    this.addChild( new HeadToggleNode( model.headModeProperty, { bottom: this.layoutBounds.bottom - 22, centerX: headBackNode.centerX - 40 } ) );

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

    // Add reset all button
    var resetAllButton = new ResetAllButton(
      {
        listener: function() { model.reset(); },
        bottom: this.layoutBounds.bottom - 5,
        right: sliderVBox.right,
        radius: 18
      } );

    this.addChild( resetAllButton );

    // Add thought bubbles
    addThoughtBubbles( model.perceivedColorProperty, this );

    // Add Play/Pause button
    var playPauseButton = new PlayPauseButton( model.playProperty,
      {
        bottom: this.layoutBounds.bottom - 20,
        centerX: this.layoutBounds.centerX - 25,
        radius: 20
      } );

    this.addChild( playPauseButton );

    // Add step button
    var stepButton = new StepButton( function() { model.manualStep(); }, model.playProperty,
      {
        centerY: playPauseButton.centerY,
        centerX: this.layoutBounds.centerX + 25,
        radius: 15
      } );

    this.addChild( stepButton );
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
