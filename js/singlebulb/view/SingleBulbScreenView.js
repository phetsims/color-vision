// Copyright 2014-2024, University of Colorado Boulder

/**
 * View for the 'Single Bulb' screen.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import SpectrumSliderThumb from '../../../../scenery-phet/js/SpectrumSliderThumb.js';
import SpectrumSliderTrack from '../../../../scenery-phet/js/SpectrumSliderTrack.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import { Image, Text } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Slider from '../../../../sun/js/Slider.js';
import beamViewIcon_png from '../../../images/beamViewIcon_png.js';
import filterLeft_png from '../../../images/filterLeft_png.js';
import filterRight_png from '../../../images/filterRight_png.js';
import photonViewIcon_png from '../../../images/photonViewIcon_png.js';
import singleColorLightIcon_png from '../../../images/singleColorLightIcon_png.js';
import whiteLightIcon_png from '../../../images/whiteLightIcon_png.js';
import colorVision from '../../colorVision.js';
import ColorVisionStrings from '../../ColorVisionStrings.js';
import ColorVisionConstants from '../../common/ColorVisionConstants.js';
import ColorVisionScreenView from '../../common/view/ColorVisionScreenView.js';
import HeadNode from '../../common/view/HeadNode.js';
import SingleBulbConstants from '../SingleBulbConstants.js';
import FilterHalfEllipse from './FilterHalfEllipse.js';
import FilterWireNode from './FilterWireNode.js';
import FlashlightWireNode from './FlashlightWireNode.js';
import FlashlightWithButtonNode from './FlashlightWithButtonNode.js';
import GaussianWavelengthSlider from './GaussianWavelengthSlider.js';
import SingleBulbPhotonBeamNode from './SingleBulbPhotonBeamNode.js';
import SolidBeamNode from './SolidBeamNode.js';

const bulbSliderLabelStringProperty = ColorVisionStrings.bulbSlider.labelStringProperty;
const filterSliderLabelStringProperty = ColorVisionStrings.filterSlider.labelStringProperty;

// constants
const DISTANCE_FROM_FLASHLIGHT = 20;
const SLIDER_Y_OFFSET = 21;
const SLIDER_TRACK_WIDTH = 200;
const SLIDER_TRACK_HEIGHT = 30;
const PHOTON_BEAM_START = 320;
const ICON_OPTIONS = { scale: 0.74 }; // options common to all icon images

class SingleBulbScreenView extends ColorVisionScreenView {

  /**
   * @param {SingleBulbModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {

    super( model, tandem );

    // constant for determining the distance of the wavelengthSlider from the right side of the screen
    const wavelengthSliderDistance = this.layoutBounds.maxX - 70;

    // Create flashlight node
    const flashlightNode = new FlashlightWithButtonNode( model.flashlightOnProperty, tandem.createTandem( 'flashlightNode' ), {
      centerY: this.layoutBounds.centerY + ColorVisionConstants.CENTER_Y_OFFSET + 3,
      right: this.layoutBounds.maxX - 40
    } );

    // Create and add given string above given slider. Returns the text object created.
    const addSliderText = ( slider, sliderLabelStringProperty, textName ) => {
      const sliderText = new Text( sliderLabelStringProperty, {
        fill: 'white',
        font: new PhetFont( 20 ),
        bottom: slider.top - 3,
        maxWidth: 0.85 * slider.width,
        tandem: tandem.createTandem( textName )
      } );

      // Ensure sliderText is always right-aligned with the slider, to support dynamic locale
      sliderLabelStringProperty.link( () => {
        sliderText.right = slider.right - 18;
      } );

      this.pdomPlayAreaNode.addChild( sliderText );
      return sliderText;
    };

    // Create upper WavelengthSlider node
    const colorSpectrumRange = new Range( VisibleColor.MIN_WAVELENGTH, VisibleColor.MAX_WAVELENGTH );
    const spectrumSliderTrack = new SpectrumSliderTrack( model.flashlightWavelengthProperty, colorSpectrumRange, {
      size: new Dimension2( SLIDER_TRACK_WIDTH, SLIDER_TRACK_HEIGHT ),
      borderRectangleOptions: {
        stroke: ColorVisionConstants.SLIDER_BORDER_STROKE
      },
      valueToColor: function( value ) {
        return VisibleColor.wavelengthToColor( value );
      },
      tandem: tandem.createTandem( 'spectrumSliderTrack' )
    } );
    const thumbNode = new SpectrumSliderThumb( model.flashlightWavelengthProperty, {
      width: 30,
      height: 40,
      lineWidth: 0.5,
      windowCursorOptions: {
        stroke: 'white'
      },
      valueToColor: function( value ) {
        return VisibleColor.wavelengthToColor( value );
      },
      tandem: tandem.createTandem( 'thumbNode' )
    } );
    const bulbColorSlider = new Slider( model.flashlightWavelengthProperty, colorSpectrumRange, {
      top: this.layoutBounds.top + 40,
      right: wavelengthSliderDistance,
      tweakersVisible: false,
      valueVisible: false,
      trackNode: spectrumSliderTrack,
      thumbNode: thumbNode,
      accessibleName: ColorVisionStrings.bulbSlider.labelStringProperty,
      tandem: tandem.createTandem( 'bulbColorSlider' )
    } );

    // add text above the upper slider
    const bulbColorText = addSliderText( bulbColorSlider, bulbSliderLabelStringProperty, 'bulbColorText' );

    // Add wire from flashlight to WavelengthSlider
    const flashlightWire = new FlashlightWireNode(
      new Vector2( flashlightNode.right - 15, flashlightNode.centerY + 2 ),
      new Vector2( bulbColorSlider.right - 25, bulbColorSlider.centerY - SLIDER_Y_OFFSET ),
      25 );

    // make bulb color slider invisible when on white light mode
    model.lightTypeProperty.link( lightType => {
      const coloredLight = lightType !== 'white';
      bulbColorSlider.visible = coloredLight;
      bulbColorText.visible = coloredLight;
      flashlightWire.visible = coloredLight;
    } );

    this.pdomPlayAreaNode.addChild( flashlightWire );
    this.pdomPlayAreaNode.addChild( bulbColorSlider );

    // options common to all RectangularRadioButtonGroups
    const radioButtonGroupOptions = merge( {
      left: flashlightNode.left,
      radioButtonOptions: {
        xMargin: 2,
        yMargin: 2
      }
    }, ColorVisionConstants.RADIO_BUTTON_GROUP_OPTIONS );

    const whiteColoredButtonsContent = [ {
      value: 'white',
      createNode: () => new Image( whiteLightIcon_png, ICON_OPTIONS ),
      tandemName: 'whiteLightRadioButton'
    }, {
      value: 'colored',
      createNode: () => new Image( singleColorLightIcon_png, ICON_OPTIONS ),
      tandemName: 'monochromaticLightRadioButton'
    } ];

    const whiteColoredRadioButtonGroup = new RectangularRadioButtonGroup( model.lightTypeProperty, whiteColoredButtonsContent,
      merge( {
        bottom: flashlightNode.top - DISTANCE_FROM_FLASHLIGHT,
        tandem: tandem.createTandem( 'whiteColoredRadioButtonGroup' ),
        labelContent: ColorVisionStrings.a11y.lightOutputTypesStringProperty
      }, radioButtonGroupOptions )
    );

    const beamPhotonButtonsContent = [ {
      value: 'beam',
      createNode: () => new Image( beamViewIcon_png, ICON_OPTIONS ),
      tandemName: 'beamRadioButton'
    }, {
      value: 'photon',
      createNode: () => new Image( photonViewIcon_png, ICON_OPTIONS ),
      tandemName: 'photonsRadioButton'
    } ];

    const beamPhotonRadioButtonGroup = new RectangularRadioButtonGroup( model.beamTypeProperty, beamPhotonButtonsContent,
      merge( {
        top: flashlightNode.bottom + DISTANCE_FROM_FLASHLIGHT,
        tandem: tandem.createTandem( 'beamPhotonRadioButtonGroup' ),
        labelContent: ColorVisionStrings.a11y.lightRepresentationModesStringProperty
      }, radioButtonGroupOptions )
    );

    this.pdomPlayAreaNode.addChild( whiteColoredRadioButtonGroup );
    this.pdomPlayAreaNode.addChild( beamPhotonRadioButtonGroup );

    // right and left filters have the same image dimensions (while only taking up half of the image each),
    // so both can use the same option parameters and can be positioned the same and will match up perfectly
    const filterOptions = {
      centerY: this.layoutBounds.centerY + ColorVisionConstants.CENTER_Y_OFFSET,
      scale: 0.7,
      right: flashlightNode.left - 100
    };

    // Add the circular filter images into the scene
    // Note: In Chrome, there is a 1px wide white line that can been seen separating the two image halves,
    // seen in both Windows and OSX. So far, it has seemed minor enough to ignore.
    const filterLeftNode = new Image( filterLeft_png, filterOptions );
    const filterRightNode = new Image( filterRight_png, filterOptions );
    model.filterVisibleProperty.linkAttribute( filterLeftNode, 'visible' );
    model.filterVisibleProperty.linkAttribute( filterRightNode, 'visible' );

    // tell the photon beam model where the filter position is
    model.photonBeam.filterOffset = filterLeftNode.centerX - PHOTON_BEAM_START;

    // Create photonBeam node
    // @private
    this.photonBeamNode = new SingleBulbPhotonBeamNode( model, tandem.createTandem( 'photonBeamNode' ), {
      canvasBounds: new Bounds2( 0, 0, SingleBulbConstants.SINGLE_BEAM_LENGTH, ColorVisionConstants.BEAM_HEIGHT ),
      x: PHOTON_BEAM_START
    } );
    this.photonBeamNode.centerY = this.layoutBounds.centerY + ColorVisionConstants.CENTER_Y_OFFSET;

    // Create gaussian wavelength slider for controlling the filter color
    const gaussianSlider = new GaussianWavelengthSlider( model.filterWavelengthProperty, SLIDER_TRACK_WIDTH, SLIDER_TRACK_HEIGHT,
      tandem.createTandem( 'gaussianSlider' ), {
        bottom: this.layoutBounds.bottom - 20,
        right: wavelengthSliderDistance
      } );

    // Add the text above the gaussian wavelength slider
    addSliderText( gaussianSlider, filterSliderLabelStringProperty, 'filterColorText' );

    // Add the wire from the slider to the filter
    const filterWireNode = new FilterWireNode(
      model.filterVisibleProperty,
      new Vector2( filterLeftNode.centerX, filterLeftNode.bottom ),
      new Vector2( gaussianSlider.left + 16, gaussianSlider.centerY - SLIDER_Y_OFFSET ),
      tandem.createTandem( 'filterWireNode' )
    );
    this.pdomPlayAreaNode.addChild( filterWireNode );

    this.pdomPlayAreaNode.addChild( gaussianSlider );

    // Left half of the filter
    const filterLeft = new FilterHalfEllipse(
      model.filterWavelengthProperty,
      model.filterVisibleProperty,
      filterLeftNode.centerX + 1,
      filterLeftNode.centerY,
      filterLeftNode.width / 2 - 13,
      filterLeftNode.height / 2 - 12,
      true
    );

    // Right half of the filter
    const filterRight = new FilterHalfEllipse(
      model.filterWavelengthProperty,
      model.filterVisibleProperty,
      filterLeftNode.centerX - 1,
      filterLeftNode.centerY,
      filterLeftNode.width / 2 - 13,
      filterLeftNode.height / 2 - 12,
      false
    );

    // bounds for the solid beam view
    const beamBounds = new Bounds2(
      filterLeft.left - 130,
      this.layoutBounds.centerY + ColorVisionConstants.CENTER_Y_OFFSET + 54,
      flashlightNode.left + 15,
      this.layoutBounds.centerY + ColorVisionConstants.CENTER_Y_OFFSET - 48
    );

    const solidBeam = new SolidBeamNode( model, beamBounds, filterLeftNode.centerX );

    // Add right side of filter before the solid beam and the left side
    this.pdomPlayAreaNode.addChild( filterRightNode );
    this.pdomPlayAreaNode.addChild( filterRight );

    // Add the head node and solid and photon beams above the right side of the filter so they show up on top
    const headNode = new HeadNode(
      model.headModeProperty,
      this.layoutBounds.bottom,
      [ solidBeam, this.photonBeamNode ],
      tandem.createTandem( 'headNode' )
    );
    this.pdomPlayAreaNode.addChild( headNode );

    // Add the left side of the filter above the beams so it appears to pass behind
    this.pdomPlayAreaNode.addChild( filterLeftNode );
    this.pdomPlayAreaNode.addChild( filterLeft );

    // flashlight is added after the beams so it covers up the beginning of the beam
    this.pdomPlayAreaNode.addChild( flashlightNode );

    // set the tab navigation order
    this.pdomPlayAreaNode.pdomOrder = [
      flashlightNode,
      bulbColorSlider,
      whiteColoredRadioButtonGroup,
      beamPhotonRadioButtonGroup,
      filterWireNode,
      gaussianSlider,
      headNode
    ];
  }

  // @public
  step( dt ) {
    // Cap dt, see https://github.com/phetsims/color-vision/issues/115 and https://github.com/phetsims/joist/issues/130
    dt = Math.min( dt, 0.5 );
    this.photonBeamNode.step( dt );
  }
}

colorVision.register( 'SingleBulbScreenView', SingleBulbScreenView );
export default SingleBulbScreenView;