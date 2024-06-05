// Copyright 2014-2022, University of Colorado Boulder

/**
 * View for RGBSlider objects
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import { Color, Font, LinearGradient, Rectangle, Text } from '../../../../scenery/js/imports.js';
import VSlider from '../../../../sun/js/VSlider.js';
import colorVision from '../../colorVision.js';
import ColorVisionConstants from '../../common/ColorVisionConstants.js';

class RGBSlider extends Rectangle {

  /**
   * @param {Property.<number>} intensityProperty the intensity property for this color from the model
   * @param {string} color
   * @param {Tandem} tandem
   */
  constructor( intensityProperty, color, tandem ) {

    const range = new Range( 0, 100 );
    const slider = new VSlider( intensityProperty, range, {
      trackSize: new Dimension2( 2, 100 ),
      thumbSize: new Dimension2( 28, 14 ),
      thumbTouchAreaXDilation: 7,
      thumbTouchAreaYDilation: 7,
      majorTickStroke: Color.WHITE,
      minorTickStroke: Color.WHITE,
      majorTickLength: 15,
      minorTickLength: 7,
      tandem: tandem
    } );

    const tickLabelOptions = { font: new Font( { size: 12 } ), fill: Color.WHITE, maxWidth: 25 };

    // major ticks
    slider.addMajorTick( range.min, new Text( range.min, tickLabelOptions ) );
    slider.addMajorTick( range.getCenter(), new Text( range.getCenter(), tickLabelOptions ) );
    slider.addMajorTick( range.max, new Text( range.max, tickLabelOptions ) );

    // minor ticks
    slider.addMinorTick( range.min + 0.25 * range.getLength() );
    slider.addMinorTick( range.min + 0.75 * range.getLength() );

    const rectWidth = slider.width + 8;
    const rectHeight = slider.height + 22;

    super( 0, 0, rectWidth, rectHeight, 5, 5,
      {
        fill: new LinearGradient( 0, 0, 0, rectHeight ).addColorStop( 0, color ).addColorStop( 1, 'black' ),
        stroke: ColorVisionConstants.SLIDER_BORDER_STROKE
      } );

    slider.centerX = this.centerX;
    slider.centerY = this.centerY;

    this.addChild( slider );
  }
}

colorVision.register( 'RGBSlider', RGBSlider );

export default RGBSlider;