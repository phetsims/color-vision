// Copyright 2014-2024, University of Colorado Boulder

/**
 * View for RGBSlider objects
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Font from '../../../../scenery/js/util/Font.js';
import LinearGradient from '../../../../scenery/js/util/LinearGradient.js';
import VSlider from '../../../../sun/js/VSlider.js';
import colorVision from '../../colorVision.js';
import ColorVisionStrings from '../../ColorVisionStrings.js';
import ColorVisionConstants from '../../common/ColorVisionConstants.js';

class RGBSlider extends Rectangle {

  /**
   * @param {Property.<number>} intensityProperty the intensity property for this color from the model
   * @param {string} color
   * @param {Tandem} tandem
   */
  constructor( intensityProperty, color, lightColorStringProperty, tandem ) {

    const range = new Range( 0, 100 );
    const slider = new VSlider( intensityProperty, range, {
      trackSize: new Dimension2( 0.5, 90 ),
      thumbSize: new Dimension2( 28, 14 ),
      thumbTouchAreaXDilation: 7,
      thumbTouchAreaYDilation: 7,
      majorTickStroke: 'white',
      minorTickStroke: 'white',
      majorTickLength: 15,
      minorTickLength: 7,
      trackStroke: 'white',
      accessibleName: lightColorStringProperty,
      tandem: tandem
    } );

    // major ticks
    slider.addMajorTick( range.min );
    slider.addMajorTick( range.getCenter() );
    slider.addMajorTick( range.max );

    // minor ticks
    slider.addMinorTick( range.min + 0.25 * range.getLength() );
    slider.addMinorTick( range.min + 0.75 * range.getLength() );

    // labels
    const labelOptions = { font: new Font( { size: 12 } ), maxWidth: 40, fill: 'white' };
    const rangeMaxText = new Text( StringUtils.fillIn( ColorVisionStrings.valuePercentPatternStringProperty, { value: range.max } ), labelOptions );
    const rangeMinText = new Text( StringUtils.fillIn( ColorVisionStrings.valuePercentPatternStringProperty, { value: range.min } ), labelOptions );

    const sliderAndLabelsVBox = new VBox( { children: [ rangeMaxText, slider, rangeMinText ], spacing: 0 } );

    const rectWidth = sliderAndLabelsVBox.width + 8;
    const rectHeight = sliderAndLabelsVBox.height + 6;

    super( 0, 0, rectWidth, rectHeight, 5, 5,
      {
        fill: new LinearGradient( 0, 0, 0, rectHeight ).addColorStop( 0, color ).addColorStop( 1, 'black' ),
        stroke: ColorVisionConstants.SLIDER_BORDER_STROKE
      } );

    sliderAndLabelsVBox.centerX = this.centerX;
    sliderAndLabelsVBox.centerY = this.centerY;

    this.addChild( sliderAndLabelsVBox );
  }
}

colorVision.register( 'RGBSlider', RGBSlider );

export default RGBSlider;