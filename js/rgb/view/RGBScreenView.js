// Copyright 2014-2022, University of Colorado Boulder

/**
 * View for the 'RGB' screen
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Range from '../../../../dot/js/Range.js';
import NumberDisplay from '../../../../scenery-phet/js/NumberDisplay.js';
import { Font, HBox, Image, Text, VBox } from '../../../../scenery/js/imports.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import flashlight0Deg_png from '../../../images/flashlight0Deg_png.js';
import flashlightNeg45Deg_png from '../../../images/flashlightNeg45Deg_png.js';
import flashlightPos45Deg_png from '../../../images/flashlightPos45Deg_png.js';
import colorVision from '../../colorVision.js';
import ColorVisionStrings from '../../ColorVisionStrings.js';
import ColorVisionConstants from '../../common/ColorVisionConstants.js';
import ColorVisionScreenView from '../../common/view/ColorVisionScreenView.js';
import HeadNode from '../../common/view/HeadNode.js';
import RGBConstants from '../RGBConstants.js';
import RGBPhotonBeamNode from './RGBPhotonBeamNode.js';
import RGBSlider from './RGBSlider.js';

// constants
const BEAM_ANGLE = Math.PI / 6;
const FLASHLIGHT_SCALE = 0.73;

// strings
const redLightStringProperty = ColorVisionStrings.redLightStringProperty;
const greenLightStringProperty = ColorVisionStrings.greenLightStringProperty;
const blueLightStringProperty = ColorVisionStrings.blueLightStringProperty;
const rgbIntensityValuesStringProperty = ColorVisionStrings.RgbIntensityValuesStringProperty;

class RGBScreenView extends ColorVisionScreenView {

  /**
   * @param {RGBModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {

    super( model, tandem );

    // Add photon beams
    // @private
    this.redBeam = new RGBPhotonBeamNode( model.redBeam, tandem.createTandem( 'redBeam' ), {
      canvasBounds: new Bounds2( 0, 0, RGBConstants.RED_BEAM_LENGTH, ColorVisionConstants.BEAM_HEIGHT ),
      x: 280,
      y: 190,
      rotation: -BEAM_ANGLE
    } );

    // @private
    this.greenBeam = new RGBPhotonBeamNode( model.greenBeam, tandem.createTandem( 'greenBeam' ), {
      canvasBounds: new Bounds2( 0, 0, RGBConstants.GREEN_BEAM_LENGTH, ColorVisionConstants.BEAM_HEIGHT ),
      x: 320
    } );
    this.greenBeam.centerY = this.layoutBounds.centerY + ColorVisionConstants.CENTER_Y_OFFSET;

    // @private
    this.blueBeam = new RGBPhotonBeamNode( model.blueBeam, tandem.createTandem( 'blueBeam' ), {
      canvasBounds: new Bounds2( 0, 0, RGBConstants.BLUE_BEAM_LENGTH, ColorVisionConstants.BEAM_HEIGHT ),
      x: 320,
      y: 145,
      rotation: BEAM_ANGLE
    } );

    // add head node
    const beamArray = [ this.redBeam, this.blueBeam, this.greenBeam ];
    const headNode = new HeadNode( model.headModeProperty, this.layoutBounds.bottom, beamArray, tandem.createTandem( 'headNode' ) );
    this.pdomControlAreaNode.addChild( headNode );

    // Add flashlights
    const redFlashlightNode = new Image( flashlightNeg45Deg_png, { scale: FLASHLIGHT_SCALE } );
    const greenFlashlightNode = new Image( flashlight0Deg_png, { scale: FLASHLIGHT_SCALE } );
    const blueFlashlightNode = new Image( flashlightPos45Deg_png, { scale: FLASHLIGHT_SCALE } );

    const flashlightVBox = new VBox( {
      children: [
        redFlashlightNode,
        greenFlashlightNode,
        blueFlashlightNode ],
      spacing: 85,
      right: this.layoutBounds.maxX - 96,
      centerY: this.layoutBounds.centerY + ColorVisionConstants.CENTER_Y_OFFSET
    } );

    this.pdomControlAreaNode.addChild( flashlightVBox );

    const showRGBIntensityValuesBooleanProperty = new BooleanProperty( false );
    const numberDisplayOptions = { align: 'center', cornerRadius: 3, backgroundStroke: 'black',
      minBackgroundWidth: 65, visibleProperty: showRGBIntensityValuesBooleanProperty };
    const labelOptions = { font: new Font( { size: 16 } ), fill: 'white', maxWidth: 125 };

    // Function to create a slider, intensity property display, and label
    const createSliderAndLabel = ( intensityProperty, color, tandemId, lightStringProperty ) => {
      const slider = new RGBSlider( intensityProperty, color, tandem.createTandem( tandemId ) );
      const intensityPropertyDisplay = new NumberDisplay( intensityProperty, new Range( 0, 100 ), numberDisplayOptions );
      const lightLabel = new Text( lightStringProperty, labelOptions );

      // Create a VBox for the intensity property display and light label
      const lightLabelAndIntensityVBox = new VBox( {
        children: [ intensityPropertyDisplay, lightLabel ],
        spacing: 3,
        align: 'center'
      } );

      // Combine VBox and slider in an HBox
      return new HBox( {
        children: [ lightLabelAndIntensityVBox, slider ],
        spacing: 20,
        align: 'bottom'
      } );
    };

    // Create sliders and labels
    const redSliderAndLabel = createSliderAndLabel( model.redIntensityProperty, 'red', 'redSlider', redLightStringProperty );
    const greenSliderAndLabel = createSliderAndLabel( model.greenIntensityProperty, 'green', 'greenSlider', greenLightStringProperty );
    const blueSliderAndLabel = createSliderAndLabel( model.blueIntensityProperty, 'blue', 'blueSlider', blueLightStringProperty );

    const sliderAndLabelVBox = new VBox( {
      children: [ redSliderAndLabel, greenSliderAndLabel, blueSliderAndLabel ],
      spacing: 15,
      align: 'right',
      right: this.layoutBounds.maxX - 16,
      centerY: flashlightVBox.centerY
    } );

    // Ensure sliderAndLabelVBox stays right-aligned to support dynamic locale
    Multilink.multilink( [ redLightStringProperty, greenLightStringProperty, blueLightStringProperty ], () => {
      sliderAndLabelVBox.right = this.layoutBounds.maxX - 16;
    } );

    this.pdomControlAreaNode.addChild( sliderAndLabelVBox );

    // Add checkbox to show / hide the RGB intensity number displays
    const showRGBIntensityValuesCheckbox = new Checkbox( showRGBIntensityValuesBooleanProperty,
      new Text( rgbIntensityValuesStringProperty,
        { fill: 'white', font: new Font( { size: 16 } ), maxWidth: 175 } ),
      { checkboxColor: 'white', checkboxColorBackground: 'black' }
    );
    showRGBIntensityValuesCheckbox.centerY = this.timeControlNode.centerY;
    showRGBIntensityValuesCheckbox.left = this.timeControlNode.right + 30;
    this.pdomControlAreaNode.addChild( showRGBIntensityValuesCheckbox );

    // set the tab navigation order
    this.pdomControlAreaNode.pdomOrder = [
      sliderAndLabelVBox,
      showRGBIntensityValuesCheckbox,
      headNode,
      this.timeControlNode,
      this.resetAllButton
    ];
  }

  // @public
  step( dt ) {
    // Cap dt, see https://github.com/phetsims/color-vision/issues/115 and https://github.com/phetsims/joist/issues/130
    dt = Math.min( dt, 0.5 );
    this.redBeam.step( dt );
    this.greenBeam.step( dt );
    this.blueBeam.step( dt );
  }
}

colorVision.register( 'RGBScreenView', RGBScreenView );
export default RGBScreenView;