// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for RGBSlider objects
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var HSlider = require( 'SUN/HSlider' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Dimension2 = require( 'DOT/Dimension2' );

  /**
   * @param {Property} intensityProperty the intensity property for this color from the model
   * @param {String} color
   * @constructor
   */
  function RGBSlider( intensityProperty, color ) {

    var hSlider = new HSlider( intensityProperty, { min: 0, max: 100 },
      {
        thumbSize: new Dimension2( 14, 28 ),
        trackSize: new Dimension2( 100, 2 )
      } );
    hSlider.rotation = -Math.PI / 2;

    var rectWidth = hSlider.width + 8;
    var rectHeight = hSlider.height + 30;

    Rectangle.call( this, 0, 0, rectWidth, rectHeight, 5, 5,
      {
        fill: new LinearGradient( 0, 0, 0, rectHeight ).addColorStop( 0, color ).addColorStop( 1, 'black' ),
        stroke: '#c0b9b9' // gray
      } );

    hSlider.centerX = this.centerX;
    hSlider.centerY = this.centerY;

    this.addChild( hSlider );
  }

  return inherit( Rectangle, RGBSlider );
} );
