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
  var PlayPauseButton = require( 'SCENERY_PHET/PlayPauseButton' );
  var StepButton = require( 'SCENERY_PHET/StepButton' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var RGBSlider = require( 'COLOR_VISION/rgb/view/RGBSlider' );
  var HeadNode = require( 'COLOR_VISION/common/view/HeadNode' );
  var ThoughtBubble = require( 'COLOR_VISION/common/view/ThoughtBubble' );
  var RGBPhotonBeamNode = require( 'COLOR_VISION/rgb/view/RGBPhotonBeamNode' );
  var HeadToggleNode = require( 'COLOR_VISION/common/view/HeadToggleNode' );
  var Constants = require( 'COLOR_VISION/ColorVisionConstants' );
  var RGBConstants = require( 'COLOR_VISION/rgb/RGBConstants' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );

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
        canvasBounds: new Bounds2( 0, 0, RGBConstants.RED_BEAM_LENGTH, Constants.BEAM_HEIGHT ),
        x: 280,
        y: 190,
        rotation: -BEAM_ANGLE
      } );

    this.greenBeam = new RGBPhotonBeamNode( model.greenBeam,
      {
        canvasBounds: new Bounds2( 0, 0, RGBConstants.GREEN_BEAM_LENGTH, Constants.BEAM_HEIGHT ),
        x: 320
      } );
    this.greenBeam.centerY = this.layoutBounds.centerY + Constants.CENTER_Y_OFFSET;

    this.blueBeam = new RGBPhotonBeamNode( model.blueBeam,
      {
        canvasBounds: new Bounds2( 0, 0, RGBConstants.BLUE_BEAM_LENGTH, Constants.BEAM_HEIGHT ),
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
    this.addChild( new ThoughtBubble( model, 45, { centerX: 220 + thoughtBubbleX, centerY: 60 + thoughtBubbleY } ) );
    this.addChild( new ThoughtBubble( model, 15, { centerX: 90 + thoughtBubbleX, centerY: 105 + thoughtBubbleY } ) );
    this.addChild( new ThoughtBubble( model, 12, { centerX: 62 + thoughtBubbleX, centerY: 165 + thoughtBubbleY } ) );
    this.addChild( new ThoughtBubble( model, 7, { centerX: 50 + thoughtBubbleX, centerY: 220 + thoughtBubbleY } ) );

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

    function sleep( millis ) {
      var date = new Date();
      var curDate;
      do {
        curDate = new Date();
      } while ( curDate - date < millis );
    }

    this.addChild( new TextPushButton( 'SLOW', {
      listener: function() {
        sleep( 500 );
      },
      visible: false
    } ) );

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
