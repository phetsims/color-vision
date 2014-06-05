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
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var PlayPauseButton = require( 'SCENERY_PHET/PlayPauseButton' );
  var StepButton = require( 'SCENERY_PHET/StepButton' );
  var Color = require( 'SCENERY/util/Color' );
  var WavelengthSlider = require( 'SCENERY_PHET/WavelengthSlider' );
  var Vector2 = require( 'DOT/Vector2' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var HeadNode = require( 'COLOR_VISION/common/view/HeadNode' );
  var ColorVisionEllipse = require( 'COLOR_VISION/common/view/ColorVisionEllipse' );
  var Constants = require( 'COLOR_VISION/ColorVisionConstants' );
  var FlashlightWithButtonNode = require( 'COLOR_VISION/singlebulb/view/FlashlightWithButtonNode' );
  var FlashlightWireNode = require( 'COLOR_VISION/singlebulb/view/FlashlightWireNode' );
  var FilterWireNode = require( 'COLOR_VISION/singlebulb/view/FilterWireNode' );
  var GaussianCanvasNode = require( 'COLOR_VISION/singlebulb/view/GaussianCanvasNode' );
  var FilterHalfEllipse = require( 'COLOR_VISION/singlebulb/view/FilterHalfEllipse' );
  var SolidBeamNode = require( 'COLOR_VISION/singlebulb/view/SolidBeamNode' );
  var ColorVisionToggleButtons = require( 'COLOR_VISION/singlebulb/view/ColorVisionToggleButtons' );
  var SingleBulbPhotonBeamNode = require( 'COLOR_VISION/singlebulb/view/SingleBulbPhotonBeamNode' );

  // images
  var headBack = require( 'image!COLOR_VISION/head.png' );
  var filterLeftImage = require( 'image!COLOR_VISION/filter-left.png' );
  var filterRightImage = require( 'image!COLOR_VISION/filter-right.png' );
  // var mockupImage = require ( 'image!COLOR_VISION/mockup.png' );

  /**
   * @constructor
   */
  function RGBScreenView( model ) {

    ScreenView.call( this, { renderer: 'svg' } );

    // this.addChild( new Image( mockupImage, {
    //   centerX: ScreenView.DEFAULT_LAYOUT_BOUNDS.centerX - 25,
    //   centerY: ScreenView.DEFAULT_LAYOUT_BOUNDS.centerY - 25,
    //   scale: ScreenView.DEFAULT_LAYOUT_BOUNDS.height / mockupImage.height,
    //   opacity: 0.5
    // } ) );

    // constants
    var wavelengthSliderDistance = this.layoutBounds.maxX - 70;
    var distanceFromFlashlight = 15;
    var buttonOffsetFromFlashlight = 13;
    var sliderYOffset = 24;
    var sliderXOffset = 18;
    var sliderTrackWidth = 200;
    var sliderTrackHeight = 30;
    var photonBeamStart = 320;
    var playStepButtonColor = new Color( 247, 151, 34 );

    // for moving the thought bubbles together as a group
    var thoughtBubbleX = -15;
    var thoughtBubbleY = -10;

    // Add thought bubbles
    this.addChild( new ColorVisionEllipse( model, 220 + thoughtBubbleX, 60 + thoughtBubbleY, 45 ) );
    this.addChild( new ColorVisionEllipse( model, 90 + thoughtBubbleX, 105 + thoughtBubbleY, 15 ) );
    this.addChild( new ColorVisionEllipse( model, 62 + thoughtBubbleX, 165 + thoughtBubbleY, 12 ) );
    this.addChild( new ColorVisionEllipse( model, 50 + thoughtBubbleX, 220 + thoughtBubbleY, 7 ) );

    // Add head image
    var headImageNode = new HeadNode( headBack, this.layoutBounds.bottom + Constants.CENTER_Y_OFFSET );
    this.addChild( headImageNode );

    // Create flashlight node
    var flashlightNode = new FlashlightWithButtonNode( model.flashlightOnProperty,
      {
        centerY: this.layoutBounds.centerY + Constants.CENTER_Y_OFFSET,
        right: this.layoutBounds.maxX - 50
      } );

    // Create upper WavelengthSlider node
    var upperSliderNode = new WavelengthSlider( model.flashlightWavelengthProperty,
      {
        top: this.layoutBounds.top + 20,
        right: wavelengthSliderDistance,
        tweakersVisible: false,
        valueVisible: false,
        trackWidth: sliderTrackWidth,
        trackHeight: sliderTrackHeight
      } );
    model.lightProperty.link( function( light ) {
      upperSliderNode.visible = ( light !== 'white' );
    } );

    // Add wire from flashlight to WavelengthSlider
    var flashlightWire = new FlashlightWireNode(
      new Vector2( flashlightNode.right - 10, flashlightNode.centerY + 2 ),
      new Vector2( upperSliderNode.right - sliderXOffset, upperSliderNode.centerY - sliderYOffset ),
      25 );
    model.lightProperty.link( function( light ) {
      flashlightWire.visible = ( light !== 'white' );
    } );

    this.addChild( flashlightWire );
    this.addChild( upperSliderNode );

    // Add buttons
    var colorWhiteSelectButtons = new ColorVisionToggleButtons( model.lightProperty, 'color',
      {
        bottom: flashlightNode.top - distanceFromFlashlight,
        left: flashlightNode.left + buttonOffsetFromFlashlight
      } );

    var beamPhotonSelectButtons = new ColorVisionToggleButtons( model.beamProperty, 'beam',
      {
        top: flashlightNode.bottom + distanceFromFlashlight,
        left: flashlightNode.left + buttonOffsetFromFlashlight
      } );

    this.addChild( colorWhiteSelectButtons );
    this.addChild( beamPhotonSelectButtons );

    // right and left filters have the same image dimensions (while only taking up half of the image each),
    // so can be positioned the same location and will match up perfectly
    var filterOptions = {
      centerY: this.layoutBounds.centerY + Constants.CENTER_Y_OFFSET,
      scale: 0.7,
      right: flashlightNode.left - 100
    };

    // Add the circular filter images into the scene
    // Note: In Chrome, there is a 1px wide white line that can been seen separating the two image halves,
    // seen in both Windows and OSX. So far, it has seemed minor enough to ignore.
    var filterLeftNode = new Image( filterLeftImage, filterOptions );
    var filterRightNode = new Image( filterRightImage, filterOptions );
    model.filterVisibleProperty.linkAttribute( filterLeftNode, 'visible' );
    model.filterVisibleProperty.linkAttribute( filterRightNode, 'visible' );

    // tell the photon beam where the filter location is
    model.photonBeam.filterOffset = filterLeftNode.centerX - photonBeamStart;

    // Create photonBeam node
    this.photonBeamNode = new SingleBulbPhotonBeamNode( model,
      {
        canvasBounds: new Bounds2( 0, 0, Constants.SINGLE_BEAM_LENGTH, Constants.BEAM_HEIGHT ),
        x: photonBeamStart
      } );
    this.photonBeamNode.centerY = this.layoutBounds.centerY + Constants.CENTER_Y_OFFSET;

    // Add lower WavelengthSlider
    var lowerSliderNodeTransparent = new WavelengthSlider( model.filterWavelengthProperty,
      {
        bottom: this.layoutBounds.bottom - 20,
        right: wavelengthSliderDistance,
        tweakersVisible: false,
        valueVisible: false,
        trackWidth: sliderTrackWidth,
        trackHeight: sliderTrackHeight,
        trackOpacity: 0.5,
        cursorVisible: false
      } );

    this.addChild( new FilterWireNode(
      model.filterVisibleProperty,
      new Vector2( filterLeftNode.centerX, filterLeftNode.bottom ),
      new Vector2( lowerSliderNodeTransparent.left + sliderXOffset, lowerSliderNodeTransparent.centerY - sliderYOffset )
    ) );

    // var trackRectangle = new Rectangle( sliderXOffset, -8, sliderTrackWidth, sliderTrackHeight + 7 );
    // var gaussian = new GaussianNode( model.filterWavelengthProperty, trackRectangle, lowerSliderNodeOpaque );

    var trackBounds = new Bounds2( sliderXOffset, -8, sliderXOffset + sliderTrackWidth, sliderTrackHeight - 10 );
    var gaussian = new GaussianCanvasNode( model.filterWavelengthProperty, trackBounds );

    this.addChild( lowerSliderNodeTransparent );
    // this.addChild( lowerSliderNodeOpaque );
    // lowerSliderNodeOpaque.addChild( gaussian );
    lowerSliderNodeTransparent.addChild( gaussian );

    var filterLeft = new FilterHalfEllipse
    (
      model.filterWavelengthProperty,
      model.filterVisibleProperty,
        filterLeftNode.centerX + 1,
      filterLeftNode.centerY,
        filterLeftNode.width / 2 - 13,
        filterLeftNode.height / 2 - 12,
      true
    );

    var filterRight = new FilterHalfEllipse
    (
      model.filterWavelengthProperty,
      model.filterVisibleProperty,
        filterLeftNode.centerX - 1,
      filterLeftNode.centerY,
        filterLeftNode.width / 2 - 13,
        filterLeftNode.height / 2 - 12,
      false
    );

    var beamBounds = new Bounds2
    (
        headImageNode.right - 35,
        this.layoutBounds.centerY + Constants.CENTER_Y_OFFSET + 24,
        flashlightNode.left + 15,
        this.layoutBounds.centerY + Constants.CENTER_Y_OFFSET - 18
    );

    var beam = new SolidBeamNode( model, beamBounds, filterLeftNode.centerX );

    // Add right side of filter to below the beam and the left side
    this.addChild( filterRightNode );
    this.addChild( filterRight );

    // Add beam before the left side of the filter so it shows up
    this.addChild( beam );
    this.addChild( this.photonBeamNode );

    this.addChild( filterLeftNode );
    this.addChild( filterLeft );

    // flashlight is added after the beams so it covers up the beginning of the beam
    this.addChild( flashlightNode );

    // Add 'Reset All' button, resets the sim to its initial state
    var resetAllButton = new ResetAllButton(
      {
        listener: function() { model.reset(); },
        bottom: this.layoutBounds.bottom - 5,
        right: this.layoutBounds.right - 30,
        radius: 18
      } );

    this.addChild( resetAllButton );

    // Add Play/Pause button
    var playPauseButton = new PlayPauseButton( model.pausedProperty,
      {
        baseColor: playStepButtonColor,
        bottom: this.layoutBounds.bottom - 20,
        centerX: this.layoutBounds.centerX - 25,
        radius: 20
      } );

    this.addChild( playPauseButton );

    // Add step button
    var stepButton = new StepButton( function() { model.manualStep(); }, model.stepEnabledProperty,
      {
        baseColor: playStepButtonColor,
        bottom: this.layoutBounds.bottom - 20,
        centerX: this.layoutBounds.centerX + 25,
        radius: 15
      } );

    this.addChild( stepButton );
  }

  return inherit( ScreenView, RGBScreenView,
    {
      step: function( dt ) {
        this.photonBeamNode.step( dt );
      }
    } );
} );
