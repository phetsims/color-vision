// Copyright 2018, University of Colorado Boulder

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
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Range = require( 'DOT/Range' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var VSlider = require( 'SUN/VSlider' );

  /**
   * @param {Property.<number>} intensityProperty the intensity property for this color from the model
   * @param {string} color
   * @param {Tandem} tandem
   * @constructor
   */
  function RGBSlider( intensityProperty, color, tandem ) {

    var hSlider = new VSlider( intensityProperty, new Range( 0, 100 ), {
      trackSize: new Dimension2( 100, 2 ),
      thumbSize: new Dimension2( 14, 28 ),
      thumbTouchAreaXDilation: 7,
      thumbTouchAreaYDilation: 7,
      tandem: tandem
    } );

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
