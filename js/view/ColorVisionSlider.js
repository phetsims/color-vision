// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for ColorVisionSlider objects
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var HSlider = require( 'SUN/HSlider');
  var Rectangle = require( 'SCENERY/nodes/Rectangle');
  var LinearGradient = require( 'SCENERY/util/LinearGradient');
  var Dimension2 = require( 'DOT/Dimension2' );
  var Node = require( 'SCENERY/nodes/Node' );

  function ColorVisionSlider( intensityProperty, color ) {

    Node.call( this );

    var hSlider = new HSlider( intensityProperty, { min: 0, max: 100 },
      {
        thumbSize: new Dimension2( 14, 28 ),
        trackSize: new Dimension2( 104, 2)
      } );
    hSlider.rotation = -Math.PI / 2;

    var rectHeight = hSlider.height + 30;
    var rectWidth = hSlider.width + 8;

    var sliderGradient = new LinearGradient( 0, 0, 0, rectHeight ).
      addColorStop( 0, color ).
      addColorStop( 1, 'black' );

    var rectangle = new Rectangle( 0, 0, rectWidth, rectHeight, 5, 5,
      {
        fill: sliderGradient,
        stroke: '#c0b9b9'
      } );
    hSlider.centerX = rectangle.centerX;
    hSlider.centerY = rectangle.centerY;

    rectangle.addChild( hSlider );

    this.addChild( rectangle );
  }

  return inherit( Node, ColorVisionSlider );
} );
