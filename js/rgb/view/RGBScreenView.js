// Copyright 2014-2024, University of Colorado Boulder

/**
 * View for the 'RGB' screen
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import { Font, Image, Node, Rectangle, Text, VBox } from '../../../../scenery/js/imports.js';
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

    // Add flashlight color labels
    const addFlashlightColorLabel = ( colorStringProperty, rotation, flashlightNode, xOffset, yOffset, textName ) => {
      const colorLabelText = new Text( colorStringProperty,
        { font: new Font( { size: 20 } ), maxWidth: 90, tandem: textName } );
      const backgroundRectangle = new Rectangle( 0, 0, 105, 33,
        { cornerRadius: 10, fill: 'white', opacity: 0.5 } );
      const labelAndBackgroundNode = new Node();

      // Ensure the color label stays centered on the background rectangle, to support dynamic locale
      colorStringProperty.link( () => {
        colorLabelText.center = backgroundRectangle.center;
      } );

      labelAndBackgroundNode.addChild( backgroundRectangle );
      labelAndBackgroundNode.addChild( colorLabelText );
      labelAndBackgroundNode.setRotation( rotation );
      labelAndBackgroundNode.centerX = flashlightNode.centerX + xOffset;
      labelAndBackgroundNode.centerY = flashlightNode.centerY + yOffset;
      flashlightNode.addChild( labelAndBackgroundNode );
    };
    addFlashlightColorLabel( ColorVisionStrings.redStringProperty, -29 * Math.PI / 180, redFlashlightNode,
      45, 3, 'redLightText' );
    addFlashlightColorLabel( ColorVisionStrings.greenStringProperty, 0, greenFlashlightNode,
      45, 10, 'greenLightText' );
    addFlashlightColorLabel( ColorVisionStrings.blueStringProperty, 7 * Math.PI / 45, blueFlashlightNode,
      46, 32, 'blueLightText' );

    const flashlightVBox = new VBox( {
      children: [
        redFlashlightNode,
        greenFlashlightNode,
        blueFlashlightNode ],
      spacing: 85,
      right: this.layoutBounds.maxX - 84,
      centerY: this.layoutBounds.centerY + ColorVisionConstants.CENTER_Y_OFFSET
    } );

    this.pdomControlAreaNode.addChild( flashlightVBox );

    // Add sliders
    const redSlider = new RGBSlider( model.redIntensityProperty, 'red',
      ColorVisionStrings.redLightStringProperty, tandem.createTandem( 'redSlider' ) );
    const greenSlider = new RGBSlider( model.greenIntensityProperty, 'green',
      ColorVisionStrings.greenLightStringProperty, tandem.createTandem( 'greenSlider' ) );
    const blueSlider = new RGBSlider( model.blueIntensityProperty, 'blue',
      ColorVisionStrings.blueLightStringProperty, tandem.createTandem( 'blueSlider' ) );

    const sliderVBox = new VBox( {
      children: [
        redSlider,
        greenSlider,
        blueSlider ],
      spacing: 15,
      right: this.layoutBounds.maxX - 30,
      centerY: flashlightVBox.centerY
    } );

    this.pdomControlAreaNode.addChild( sliderVBox );

    // set the tab navigation order
    this.pdomControlAreaNode.pdomOrder = [
      sliderVBox,
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