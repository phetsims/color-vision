// Copyright 2014-2017, University of Colorado Boulder

/**
 * View for the 'Single Bulb' screen.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var ColorVisionA11yStrings = require( 'COLOR_VISION/common/ColorVisionA11yStrings' );
  var ColorVisionConstants = require( 'COLOR_VISION/common/ColorVisionConstants' );
  var ColorVisionScreenView = require( 'COLOR_VISION/common/view/ColorVisionScreenView' );
  var FilterHalfEllipse = require( 'COLOR_VISION/singlebulb/view/FilterHalfEllipse' );
  var FilterWireNode = require( 'COLOR_VISION/singlebulb/view/FilterWireNode' );
  var FlashlightWireNode = require( 'COLOR_VISION/singlebulb/view/FlashlightWireNode' );
  var FlashlightWithButtonNode = require( 'COLOR_VISION/singlebulb/view/FlashlightWithButtonNode' );
  var GaussianWavelengthSlider = require( 'COLOR_VISION/singlebulb/view/GaussianWavelengthSlider' );
  var HeadNode = require( 'COLOR_VISION/common/view/HeadNode' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var SceneSummaryNode = require( 'SCENERY_PHET/accessibility/nodes/SceneSummaryNode' );
  var SingleBulbConstants = require( 'COLOR_VISION/singlebulb/SingleBulbConstants' );
  var SingleBulbPhotonBeamNode = require( 'COLOR_VISION/singlebulb/view/SingleBulbPhotonBeamNode' );
  var SolidBeamNode = require( 'COLOR_VISION/singlebulb/view/SolidBeamNode' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );
  var WavelengthSlider = require( 'SCENERY_PHET/WavelengthSlider' );

  // images
  var beamViewIcon = require( 'image!COLOR_VISION/beam-view-icon.png' );
  var filterLeftImage = require( 'image!COLOR_VISION/filter-left.png' );
  var filterRightImage = require( 'image!COLOR_VISION/filter-right.png' );
  var photonViewIcon = require( 'image!COLOR_VISION/photon-view-icon.png' );
  var singleColorLightIcon = require( 'image!COLOR_VISION/single-color-light-icon.png' );
  var whiteLightIcon = require( 'image!COLOR_VISION/white-light-icon.png' );

  // strings
  var bulbSliderLabelString = require( 'string!COLOR_VISION/bulbSlider.label' );
  var filterSliderLabelString = require( 'string!COLOR_VISION/filterSlider.label' );
  var singleBulbModuleTitleString = require( 'string!COLOR_VISION/SingleBulbModule.title' );
  var screenNamePatternString = ColorVisionA11yStrings.screenNamePattern.value;
  var singleBulbSceneSummaryString = ColorVisionA11yStrings.singleBulbSceneSummary.value;

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

    ColorVisionScreenView.call( this, model, tandem, {
      labelContent: StringUtils.fillIn( screenNamePatternString, { screenName: singleBulbModuleTitleString } )
    } );

    var sceneSummaryNode = new SceneSummaryNode( singleBulbSceneSummaryString, {
      appendDescription: true,
      descriptionTagName: 'p',
      descriptionContent: 'Turn on bulb to begin observations. If needed, check out the Keyboard Shortcuts for this sim under Sim Resources.'
    } );
    this.addChild( sceneSummaryNode );

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
    var bulbColorTextNode = new Text( bulbSliderLabelString, {
      fill: 'white',
      font: new PhetFont( 20 ),
      bottom: bulbColorSlider.top - 3,
      right: bulbColorSlider.right - 18,
      maxWidth: 0.85 * bulbColorSlider.width,
      tandem: tandem.createTandem( 'bulbColorText' )
    } );
    this.addChild( bulbColorTextNode );

    // Add wire from flashlight to WavelengthSlider
    var flashlightWire = new FlashlightWireNode(
      new Vector2( flashlightNode.right - 15, flashlightNode.centerY + 2 ),
      new Vector2( bulbColorSlider.right - 25, bulbColorSlider.centerY - SLIDER_Y_OFFSET ),
      25 );

    // make bulb color slider invisible when on white light mode
    model.lightTypeProperty.link( function( lightType ) {
      var coloredLight = lightType !== 'white';
      bulbColorSlider.visible = coloredLight;
      bulbColorTextNode.visible = coloredLight;
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
      tandemName: 'whiteLightRadioButton'
    }, {
      value: 'colored',
      node: new Image( singleColorLightIcon, ICON_OPTIONS ),
      tandemName: 'coloredLightRadioButton'
    } ];

    var lightColorRadioButtonGroup = new RadioButtonGroup( model.lightTypeProperty, whiteColoredButtonsContent,
      _.extend( {
        bottom: flashlightNode.top - DISTANCE_FROM_FLASHLIGHT,
        tandem: tandem.createTandem( 'whiteColoredRadioButtonGroup' )
      }, iconToggleOptions )
    );

    var beamPhotonButtonsContent = [ {
      value: 'beam',
      node: new Image( beamViewIcon, ICON_OPTIONS ),
      tandemName: 'beamRadioButton'
    }, {
      value: 'photon',
      node: new Image( photonViewIcon, ICON_OPTIONS ),
      tandemName: 'photonRadioButton'
    } ];

    var beamPhotonRadioButtonGroup = new RadioButtonGroup( model.beamTypeProperty, beamPhotonButtonsContent,
      _.extend( {
        top: flashlightNode.bottom + DISTANCE_FROM_FLASHLIGHT,
        tandem: tandem.createTandem( 'beamPhotonRadioButtonGroup' )
      }, iconToggleOptions )
    );

    this.addChild( lightColorRadioButtonGroup );
    this.addChild( beamPhotonRadioButtonGroup );

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
    var filterColorSlider = new GaussianWavelengthSlider( model.filterWavelengthProperty, SLIDER_TRACK_WIDTH, SLIDER_TRACK_HEIGHT,
      tandem.createTandem( 'filterColorSlider' ), {
        bottom: this.layoutBounds.bottom - 20,
        right: wavelengthSliderDistance
      } );

    // Add the text above the gaussian wavelength slider
    var filterColorTextNode = new Text( filterSliderLabelString, {
      fill: 'white',
      font: new PhetFont( 20 ),
      bottom: filterColorSlider.top - 3,
      right: filterColorSlider.right - 18,
      maxWidth: 0.85 * filterColorSlider.width,
      tandem: tandem.createTandem( 'filterColorTextNode' )
    } );
    this.addChild( filterColorTextNode );

    // Add the wire from the slider to the filter
    var filterWireNode = new FilterWireNode(
      model.filterVisibleProperty,
      new Vector2( filterLeftNode.centerX, filterLeftNode.bottom ),
      new Vector2( filterColorSlider.left + 16, filterColorSlider.centerY - SLIDER_Y_OFFSET ),
      tandem.createTandem( 'filterWireNode' )
    );
    this.addChild( filterWireNode );

    this.addChild( filterColorSlider );

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

    // focus order for a11y
    this.accessibleOrder = [
      sceneSummaryNode, // this must be first!
      flashlightNode,
      bulbColorSlider,
      lightColorRadioButtonGroup,
      beamPhotonRadioButtonGroup,
      filterWireNode, //TODO #121 OnOffSwitch needs to be instrumented
      filterColorSlider,
      headNode
    ];
  }

  colorVision.register( 'SingleBulbScreenView', SingleBulbScreenView );

  return inherit( ColorVisionScreenView, SingleBulbScreenView, {
    step: function( dt ) {
      dt = Math.min( dt, 0.5 ); // Cap DT, see https://github.com/phetsims/color-vision/issues/115 and https://github.com/phetsims/joist/issues/130
      this.photonBeamNode.step( dt );
    }
  } );
} );

