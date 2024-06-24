// Copyright 2014-2022, University of Colorado Boulder

/**
 * View for the 'RGB' screen
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { Color, Font, Image, VBox, Text, HBox } from '../../../../scenery/js/imports.js';
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

    // Create sliders
    const redSlider = new RGBSlider( model.redIntensityProperty, 'red', tandem.createTandem( 'redSlider' ) );
    const greenSlider = new RGBSlider( model.greenIntensityProperty, 'green', tandem.createTandem( 'greenSlider' ) );
    const blueSlider = new RGBSlider( model.blueIntensityProperty, 'blue', tandem.createTandem( 'blueSlider' ) );

    // Create flashlight color labels
    const labelOptions = { font: new Font( { size: 16 } ), fill: Color.WHITE, maxWidth: 185 };
    const redLightLabel = new Text( redLightStringProperty, labelOptions );
    const greenLightLabel = new Text( greenLightStringProperty, labelOptions );
    const blueLightLabel = new Text( blueLightStringProperty, labelOptions );

    // Add flashlight labels and sliders
    const flashlightLabelAndSliderHBox = ( lightLabel, slider ) => {
      return new HBox( { children: [ lightLabel, slider ], spacing: 20, align: 'bottom' } );
    };

    const sliderAndLabelVBox = new VBox( {
      children: [
        flashlightLabelAndSliderHBox( redLightLabel, redSlider ),
        flashlightLabelAndSliderHBox( greenLightLabel, greenSlider ),
        flashlightLabelAndSliderHBox( blueLightLabel, blueSlider ) ],
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

    // set the tab navigation order
    this.pdomControlAreaNode.pdomOrder = [
      sliderAndLabelVBox,
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