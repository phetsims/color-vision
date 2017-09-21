// Copyright 2014-2017, University of Colorado Boulder

/**
 * View for RGBSlider objects
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var ColorVisionConstants = require( 'COLOR_VISION/common/ColorVisionConstants' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @param {Property.<number>} intensityProperty the intensity property for this color from the model
   * @param {string} color
   * @param {Tandem} tandem
   * @constructor
   */
  function RGBSlider( intensityProperty, color, tandem ) {

    var hSlider = new HSlider( intensityProperty, { min: 0, max: 100 }, {
      trackSize: new Dimension2( 100, 2 ),
      thumbSize: new Dimension2( 14, 28 ),
      thumbTouchAreaXDilation: 7,
      thumbTouchAreaYDilation: 7,
      tandem: tandem
    } );
    hSlider.rotation = -Math.PI / 2;

    var rectWidth = hSlider.width + 8;
    var rectHeight = hSlider.height + 22;

    Rectangle.call( this, 0, 0, rectWidth, rectHeight, 5, 5,
      {
        fill: new LinearGradient( 0, 0, 0, rectHeight ).addColorStop( 0, color ).addColorStop( 1, 'black' ),
        stroke: ColorVisionConstants.SLIDER_BORDER_STROKE
      } );

    hSlider.centerX = this.centerX;
    hSlider.centerY = this.centerY;

    this.addChild( hSlider );
  }

  colorVision.register( 'RGBSlider', RGBSlider );

  return inherit( Rectangle, RGBSlider );
} );
