// Copyright 2014-2015, University of Colorado Boulder

/**
 * View for the 'Single Bulb' screen.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ColorVisionScreenView = require( 'COLOR_VISION/common/view/ColorVisionScreenView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Text = require( 'SCENERY/nodes/Text' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var WavelengthSlider = require( 'SCENERY_PHET/WavelengthSlider' );
  var Vector2 = require( 'DOT/Vector2' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var HeadNode = require( 'COLOR_VISION/common/view/HeadNode' );
  var ColorVisionConstants = require( 'COLOR_VISION/common/ColorVisionConstants' );
  var FlashlightWithButtonNode = require( 'COLOR_VISION/singlebulb/view/FlashlightWithButtonNode' );
  var FlashlightWireNode = require( 'COLOR_VISION/singlebulb/view/FlashlightWireNode' );
  var FilterWireNode = require( 'COLOR_VISION/singlebulb/view/FilterWireNode' );
  var GaussianWavelengthSlider = require( 'COLOR_VISION/singlebulb/view/GaussianWavelengthSlider' );
  var FilterHalfEllipse = require( 'COLOR_VISION/singlebulb/view/FilterHalfEllipse' );
  var SolidBeamNode = require( 'COLOR_VISION/singlebulb/view/SolidBeamNode' );
  var SingleBulbPhotonBeamNode = require( 'COLOR_VISION/singlebulb/view/SingleBulbPhotonBeamNode' );
  var SingleBulbConstants = require( 'COLOR_VISION/singlebulb/SingleBulbConstants' );
  var TandemText = require( 'TANDEM/scenery/nodes/TandemText' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );


  // images
  var filterLeftImage = require( 'image!COLOR_VISION/filter-left.png' );
  var filterRightImage = require( 'image!COLOR_VISION/filter-right.png' );
  var whiteLightIcon = require( 'image!COLOR_VISION/white-light-icon.png' );
  var singleColorLightIcon = require( 'image!COLOR_VISION/single-color-light-icon.png' );
  var beamViewIcon = require( 'image!COLOR_VISION/beam-view-icon.png' );
  var photonViewIcon = require( 'image!COLOR_VISION/photon-view-icon.png' );

  // strings
  var bulbSliderLabelString = require( 'string!COLOR_VISION/bulbSlider.label' );
  var filterSliderLabelString = require( 'string!COLOR_VISION/filterSlider.label' );

  // constants
  var DISTANCE_FROM_FLASHLIGHT = 20;
  var SLIDER_Y_OFFSET = 21;
  var SLIDER_TRACK_WIDTH = 200;
  var SLIDER_TRACK_HEIGHT = 30;
  var PHOTON_BEAM_START = 320;
  var ICON_OPTIONS = { scale: 0.74 }; // options common to all icon images

  /**
   * @param {SingleBulbModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function SingleBulbScreenView( model, tandem ) {

    ColorVisionScreenView.call( this, model, tandem );

    // constant for determining the distance of the wavelengthSlider from the right side of the screen
    var wavelengthSliderDistance = this.layoutBounds.maxX - 70;

    // Create flashlight node
    var flashlightNode = new FlashlightWithButtonNode( model.flashlightOnProperty, tandem.createTandem( 'flashlightNode' ), {
      centerY: this.layoutBounds.centerY + ColorVisionConstants.CENTER_Y_OFFSET + 3,
      right: this.layoutBounds.maxX - 40
    } );

    // Create upper WavelengthSlider node
    var bulbColorSlider = new WavelengthSlider( model.flashlightWavelengthProperty, {
      top: this.layoutBounds.top + 40,
      right: wavelengthSliderDistance,
      tweakersVisible: false,
      valueVisible: false,
      trackWidth: SLIDER_TRACK_WIDTH,
      trackHeight: SLIDER_TRACK_HEIGHT,
      cursorStroke: 'white',
      thumbWidth: 30,
      thumbHeight: 40,
      thumbTouchAreaYDilation: 10,
      trackBorderStroke: ColorVisionConstants.SLIDER_BORDER_STROKE,
      tandem: tandem.createTandem( 'bulbColorSlider' )
    } );

    // add text above the upper slider
    var bulbColorText = new TandemText( bulbSliderLabelString, {
      fill: 'white',
      font: new PhetFont( 20 ),
      bottom: bulbColorSlider.top - 3,
      right: bulbColorSlider.right - 18,
      maxWidth: 0.85 * bulbColorSlider.width,
      tandem: tandem.createTandem( 'bulbColorText' )
    } );
    this.addChild( bulbColorText );

    // Add wire from flashlight to WavelengthSlider
    var flashlightWire = new FlashlightWireNode(
      new Vector2( flashlightNode.right - 15, flashlightNode.centerY + 2 ),
      new Vector2( bulbColorSlider.right - 25, bulbColorSlider.centerY - SLIDER_Y_OFFSET ),
      25 );

    // make bulb color slider invisible when on white light mode
    model.lightTypeProperty.link( function( lightType ) {
      var coloredLight = lightType !== 'white';
      bulbColorSlider.visible = coloredLight;
      bulbColorText.visible = coloredLight;
      flashlightWire.visible = coloredLight;
    } );

    this.addChild( flashlightWire );
    this.addChild( bulbColorSlider );

    // options common to all IconToggleNodes
    var iconToggleOptions = _.extend( {
      left: flashlightNode.left,
      buttonContentXMargin: 2,
      buttonContentYMargin: 2
    }, ColorVisionConstants.RADIO_BUTTON_OPTIONS );

    var whiteColoredButtonsContent = [ {
      value: 'white',
      node: new Image( whiteLightIcon, ICON_OPTIONS ),
      tandem: tandem.createTandem( 'whiteLightRadioButton' ),
      phetioValueType: TBoolean
    }, {
      value: 'colored',
      node: new Image( singleColorLightIcon, ICON_OPTIONS ),
      tandem: tandem.createTandem( 'coloredLightRadioButton' ),
      phetioValueType: TBoolean
    } ];

    var colorWhiteSelectButtons = new RadioButtonGroup( model.lightTypeProperty, whiteColoredButtonsContent,
      _.extend( { bottom: flashlightNode.top - DISTANCE_FROM_FLASHLIGHT }, iconToggleOptions )
    );

    var beamPhotonButtonsContent = [ {
      value: 'beam',
      node: new Image( beamViewIcon, ICON_OPTIONS ),
      tandem: tandem.createTandem( 'beamRadioButton' ),
      phetioValueType: TBoolean
    }, {
      value: 'photon',
      node: new Image( photonViewIcon, ICON_OPTIONS ),
      tandem: tandem.createTandem( 'photonRadioButton' ),
      phetioValueType: TBoolean
    } ];

    var beamPhotonSelectButtons = new RadioButtonGroup( model.beamTypeProperty, beamPhotonButtonsContent,
      _.extend( { top: flashlightNode.bottom + DISTANCE_FROM_FLASHLIGHT }, iconToggleOptions )
    );

    this.addChild( colorWhiteSelectButtons );
    this.addChild( beamPhotonSelectButtons );

    // right and left filters have the same image dimensions (while only taking up half of the image each),
    // so both can use the same option parameters and can be positioned the same location and will match up perfectly
    var filterOptions = {
      centerY: this.layoutBounds.centerY + ColorVisionConstants.CENTER_Y_OFFSET,
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

    // tell the photon beam model where the filter location is
    model.photonBeam.filterOffset = filterLeftNode.centerX - PHOTON_BEAM_START;

    // Create photonBeam node
    // @private
    this.photonBeamNode = new SingleBulbPhotonBeamNode( model, tandem.createTandem( 'photonBeamNode' ), {
      canvasBounds: new Bounds2( 0, 0, SingleBulbConstants.SINGLE_BEAM_LENGTH, ColorVisionConstants.BEAM_HEIGHT ),
      x: PHOTON_BEAM_START
    } );
    this.photonBeamNode.centerY = this.layoutBounds.centerY + ColorVisionConstants.CENTER_Y_OFFSET;

    // Create gaussian wavelength slider for controlling the filter color
    var gaussianSlider = new GaussianWavelengthSlider( model.filterWavelengthProperty, SLIDER_TRACK_WIDTH, SLIDER_TRACK_HEIGHT,
      tandem.createTandem( 'gaussianSlider' ), {
        bottom: this.layoutBounds.bottom - 20,
        right: wavelengthSliderDistance
      } );

    // Add the text above the gaussian wavelength slider
    var filterColorText = new Text( filterSliderLabelString, {
      fill: 'white',
      font: new PhetFont( 20 ),
      bottom: gaussianSlider.top - 3,
      right: gaussianSlider.right - 18,
      maxWidth: 0.85 * gaussianSlider.width
    } );
    this.addChild( filterColorText );

    // Add the wire from the slider to the filter
    this.addChild( new FilterWireNode(
      model.filterVisibleProperty,
      new Vector2( filterLeftNode.centerX, filterLeftNode.bottom ),
      new Vector2( gaussianSlider.left + 16, gaussianSlider.centerY - SLIDER_Y_OFFSET ),
      tandem.createTandem( 'filterWireNode' )
    ) );

    this.addChild( gaussianSlider );

    // Left half of the filter
    var filterLeft = new FilterHalfEllipse(
      model.filterWavelengthProperty,
      model.filterVisibleProperty,
      filterLeftNode.centerX + 1,
      filterLeftNode.centerY,
      filterLeftNode.width / 2 - 13,
      filterLeftNode.height / 2 - 12,
      true
    );

    // Right half of the filter
    var filterRight = new FilterHalfEllipse(
      model.filterWavelengthProperty,
      model.filterVisibleProperty,
      filterLeftNode.centerX - 1,
      filterLeftNode.centerY,
      filterLeftNode.width / 2 - 13,
      filterLeftNode.height / 2 - 12,
      false
    );

    // bounds for the solid beam view
    var beamBounds = new Bounds2(
      filterLeft.left - 130,
      this.layoutBounds.centerY + ColorVisionConstants.CENTER_Y_OFFSET + 54,
      flashlightNode.left + 15,
      this.layoutBounds.centerY + ColorVisionConstants.CENTER_Y_OFFSET - 48
    );

    var solidBeam = new SolidBeamNode( model, beamBounds, filterLeftNode.centerX );

    // Add right side of filter before the solid beam and the left side
    this.addChild( filterRightNode );
    this.addChild( filterRight );

    // Add the head node and solid and photon beams above the right side of the filter so they show up on top
    var headNode = new HeadNode( model.headModeProperty, this.layoutBounds.bottom, [ solidBeam, this.photonBeamNode ], tandem.createTandem( 'headNode' ) );
    this.addChild( headNode );

    // Add the left side of the filter above the beams so it appears to pass behind
    this.addChild( filterLeftNode );
    this.addChild( filterLeft );

    // flashlight is added after the beams so it covers up the beginning of the beam
    this.addChild( flashlightNode );
  }

  colorVision.register( 'SingleBulbScreenView', SingleBulbScreenView );

  return inherit( ColorVisionScreenView, SingleBulbScreenView, {
    step: function( dt ) {
      this.photonBeamNode.step( dt );
    }
  } );
} );

