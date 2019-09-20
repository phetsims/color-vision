// Copyright 2014-2019, University of Colorado Boulder

/**
 * View for RGBSlider objects
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const colorVision = require( 'COLOR_VISION/colorVision' );
  const ColorVisionConstants = require( 'COLOR_VISION/common/ColorVisionConstants' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LinearGradient = require( 'SCENERY/util/LinearGradient' );
  const Range = require( 'DOT/Range' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const VSlider = require( 'SUN/VSlider' );

  /**
   * @param {Property.<number>} intensityProperty the intensity property for this color from the model
   * @param {string} color
   * @param {Tandem} tandem
   * @constructor
   */
  function RGBSlider( intensityProperty, color, tandem ) {

    const slider = new VSlider( intensityProperty, new Range( 0, 100 ), {
      trackSize: new Dimension2( 100, 2 ),
      thumbSize: new Dimension2( 14, 28 ),
      thumbTouchAreaXDilation: 7,
      thumbTouchAreaYDilation: 7,
      tandem: tandem
    } );

    const rectWidth = slider.width + 8;
    const rectHeight = slider.height + 22;

    Rectangle.call( this, 0, 0, rectWidth, rectHeight, 5, 5,
      {
        fill: new LinearGradient( 0, 0, 0, rectHeight ).addColorStop( 0, color ).addColorStop( 1, 'black' ),
        stroke: ColorVisionConstants.SLIDER_BORDER_STROKE
      } );

    slider.centerX = this.centerX;
    slider.centerY = this.centerY;

    this.addChild( slider );
  }

  colorVision.register( 'RGBSlider', RGBSlider );

  return inherit( Rectangle, RGBSlider );
} );
