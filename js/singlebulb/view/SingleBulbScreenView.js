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
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var PlayPauseButton = require( 'SCENERY_PHET/PlayPauseButton' );
  var StepButton = require( 'SCENERY_PHET/StepButton' );
  var WavelengthSlider = require( 'SCENERY_PHET/WavelengthSlider' );
  var Vector2 = require( 'DOT/Vector2' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var HeadNode = require( 'COLOR_VISION/common/view/HeadNode' );
  var ColorVisionEllipse = require( 'COLOR_VISION/common/view/ColorVisionEllipse' );
  var Constants = require( 'COLOR_VISION/ColorVisionConstants' );
  var FlashlightWithButtonNode = require( 'COLOR_VISION/singlebulb/view/FlashlightWithButtonNode' );
  var FlashlightWireNode = require( 'COLOR_VISION/singlebulb/view/FlashlightWireNode' );
  var FilterWireNode = require( 'COLOR_VISION/singlebulb/view/FilterWireNode' );
  var GaussianWavelengthSlider = require( 'COLOR_VISION/singlebulb/view/GaussianWavelengthSlider' );
  var FilterHalfEllipse = require( 'COLOR_VISION/singlebulb/view/FilterHalfEllipse' );
  var SolidBeamNode = require( 'COLOR_VISION/singlebulb/view/SolidBeamNode' );
  var ColorVisionToggleButtons = require( 'COLOR_VISION/singlebulb/view/ColorVisionToggleButtons' );
  var SingleBulbPhotonBeamNode = require( 'COLOR_VISION/singlebulb/view/SingleBulbPhotonBeamNode' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );

  // images
  var filterLeftImage = require( 'image!COLOR_VISION/filter-left.png' );
  var filterRightImage = require( 'image!COLOR_VISION/filter-right.png' );
  var headImage = require( 'image!COLOR_VISION/color-vision-head-long-neck.png' );

  // strings
  var bulbColor = require( 'string!COLOR_VISION/bulb-color' );
  var filterColor = require( 'string!COLOR_VISION/filter-color' );

  // constants
  var DISTANCE_FROM_FLASHLIGHT = 15;
  var FLASHLIGHT_BUTTON_OFFSET = 13;
  var SLIDER_Y_OFFSET = 21;
  var SLIDER_TRACK_WIDTH = 200;
  var SLIDER_TRACK_HEIGHT = 30;
  var PHOTON_BEAM_START = 320;

  /**
   * @constructor
   */
  function RGBScreenView( model ) {

    ScreenView.call( this, { renderer: 'svg' } );

    // constants relative to layout bounds
    var wavelengthSliderDistance = this.layoutBounds.maxX - 70;

    // for moving the thought bubbles together as a group
    var thoughtBubbleX = -15;
    var thoughtBubbleY = -10;

    // Add thought bubbles
    this.addChild( new ColorVisionEllipse( model, 220 + thoughtBubbleX, 60 + thoughtBubbleY, 45 ) );
    this.addChild( new ColorVisionEllipse( model, 90 + thoughtBubbleX, 105 + thoughtBubbleY, 15 ) );
    this.addChild( new ColorVisionEllipse( model, 62 + thoughtBubbleX, 165 + thoughtBubbleY, 12 ) );
    this.addChild( new ColorVisionEllipse( model, 50 + thoughtBubbleX, 220 + thoughtBubbleY, 7 ) );

    // Add head image
    var headImageNode = new HeadNode( headImage, this.layoutBounds.bottom + 15 );
    this.addChild( headImageNode );

    // Create flashlight node
    var flashlightNode = new FlashlightWithButtonNode( model.flashlightOnProperty,
      {
        centerY: this.layoutBounds.centerY + Constants.CENTER_Y_OFFSET,
        right: this.layoutBounds.maxX - 40
      } );

    // Create upper WavelengthSlider node
    var upperSliderNode = new WavelengthSlider( model.flashlightWavelengthProperty,
      {
        top: this.layoutBounds.top + 40,
        right: wavelengthSliderDistance,
        tweakersVisible: false,
        valueVisible: false,
        trackWidth: SLIDER_TRACK_WIDTH,
        trackHeight: SLIDER_TRACK_HEIGHT,
        cursorStroke: 'white',
        thumbWidth: 30,
        thumbHeight: 40
      } );

    var bulbColorText = new Text( bulbColor, { fill: 'white', font: new PhetFont( 20 ), bottom: upperSliderNode.top - 3, right: upperSliderNode.right - 18 } );
    this.addChild( bulbColorText );

    // Add wire from flashlight to WavelengthSlider
    var flashlightWire = new FlashlightWireNode(
      new Vector2( flashlightNode.right - 15, flashlightNode.centerY + 2 ),
      new Vector2( upperSliderNode.right - 25, upperSliderNode.centerY - SLIDER_Y_OFFSET ),
      25 );

    // make bulb color slider invisible when on white light mode
    model.lightProperty.link( function( light ) {
      var coloredLight = light !== 'white';
      upperSliderNode.visible = coloredLight;
      bulbColorText.visible = coloredLight;
      flashlightWire.visible = coloredLight;
    } );

    this.addChild( flashlightWire );
    this.addChild( upperSliderNode );

    // Add buttons
    var colorWhiteSelectButtons = new ColorVisionToggleButtons( model.lightProperty, 'color',
      {
        bottom: flashlightNode.top - DISTANCE_FROM_FLASHLIGHT,
        left: flashlightNode.left + FLASHLIGHT_BUTTON_OFFSET
      } );

    var beamPhotonSelectButtons = new ColorVisionToggleButtons( model.beamProperty, 'beam',
      {
        top: flashlightNode.bottom + DISTANCE_FROM_FLASHLIGHT,
        left: flashlightNode.left + FLASHLIGHT_BUTTON_OFFSET
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
    model.photonBeam.filterOffset = filterLeftNode.centerX - PHOTON_BEAM_START;

    // Create photonBeam node
    this.photonBeamNode = new SingleBulbPhotonBeamNode( model,
      {
        canvasBounds: new Bounds2( 0, 0, Constants.SINGLE_BEAM_LENGTH, Constants.BEAM_HEIGHT ),
        x: PHOTON_BEAM_START
      } );
    this.photonBeamNode.centerY = this.layoutBounds.centerY + Constants.CENTER_Y_OFFSET;

    // Create gaussian wavelength slider
    var gaussianSlider = new GaussianWavelengthSlider( model.filterWavelengthProperty, SLIDER_TRACK_WIDTH, SLIDER_TRACK_HEIGHT );
    gaussianSlider.bottom = this.layoutBounds.bottom - 20;
    gaussianSlider.right = wavelengthSliderDistance;

    var filterColorText = new Text( filterColor, { fill: 'white', font: new PhetFont( 20 ), bottom: gaussianSlider.top - 3, right: gaussianSlider.right - 18 } );
    this.addChild( filterColorText );

    this.addChild( new FilterWireNode(
      model.filterVisibleProperty,
      new Vector2( filterLeftNode.centerX, filterLeftNode.bottom ),
      new Vector2( gaussianSlider.left + 16, gaussianSlider.centerY - SLIDER_Y_OFFSET )
    ) );

    this.addChild( gaussianSlider );

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
        this.layoutBounds.centerY + Constants.CENTER_Y_OFFSET + 54,
        flashlightNode.left + 15,
        this.layoutBounds.centerY + Constants.CENTER_Y_OFFSET - 48
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
        bottom: this.layoutBounds.bottom - 20,
        centerX: this.layoutBounds.centerX - 25,
        radius: 20
      } );

    this.addChild( playPauseButton );

    // Add step button
    var stepButton = new StepButton( function() { model.manualStep(); }, model.stepEnabledProperty,
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
        this.photonBeamNode.step( dt );
      }
    } );
} );
