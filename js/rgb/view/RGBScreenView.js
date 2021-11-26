// Copyright 2014-2021, University of Colorado Boulder

/**
 * View for the 'RGB' screen
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import { Image } from '../../../../scenery/js/imports.js';
import { VBox } from '../../../../scenery/js/imports.js';
import flashlightImage from '../../../images/flashlight-0-deg_png.js';
import flashlightDownImage from '../../../images/flashlight-neg-45-deg_png.js';
import flashlightUpImage from '../../../images/flashlight-pos-45-deg_png.js';
import colorVision from '../../colorVision.js';
import ColorVisionConstants from '../../common/ColorVisionConstants.js';
import ColorVisionScreenView from '../../common/view/ColorVisionScreenView.js';
import HeadNode from '../../common/view/HeadNode.js';
import RGBConstants from '../RGBConstants.js';
import RGBPhotonBeamNode from './RGBPhotonBeamNode.js';
import RGBSlider from './RGBSlider.js';

// constants
const BEAM_ANGLE = Math.PI / 6;
const FLASHLIGHT_SCALE = 0.73;

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
    this.addChild( headNode );

    // Add flashlights
    const redFlashlightNode = new Image( flashlightDownImage, { scale: FLASHLIGHT_SCALE } );
    const greenFlashlightNode = new Image( flashlightImage, { scale: FLASHLIGHT_SCALE } );
    const blueFlashlightNode = new Image( flashlightUpImage, { scale: FLASHLIGHT_SCALE } );

    const flashlightVBox = new VBox( {
      children: [
        redFlashlightNode,
        greenFlashlightNode,
        blueFlashlightNode ],
      spacing: 85,
      right: this.layoutBounds.maxX - 84,
      centerY: this.layoutBounds.centerY + ColorVisionConstants.CENTER_Y_OFFSET
    } );

    this.addChild( flashlightVBox );

    // Add sliders
    const redSlider = new RGBSlider( model.redIntensityProperty, 'red', tandem.createTandem( 'redSlider' ) );
    const greenSlider = new RGBSlider( model.greenIntensityProperty, 'green', tandem.createTandem( 'greenSlider' ) );
    const blueSlider = new RGBSlider( model.blueIntensityProperty, 'blue', tandem.createTandem( 'blueSlider' ) );

    const sliderVBox = new VBox( {
      children: [
        redSlider,
        greenSlider,
        blueSlider ],
      spacing: 15,
      right: this.layoutBounds.maxX - 30,
      centerY: flashlightVBox.centerY
    } );

    this.addChild( sliderVBox );
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