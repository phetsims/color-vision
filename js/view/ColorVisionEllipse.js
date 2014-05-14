// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for ColorVisionEllipse objects (thought bubbles)
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Shape = require( 'KITE/Shape' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );

  function ColorVisionEllipse( model, centerX, centerY, yRadius ) {

    Node.call( this );

    var strokeColor = '#c0b9b9'; // TODO: move to constants file
    var scaleFactor = 256 / 100;

    function getRGB() {
      return 'rgb(' + [
        Math.floor( model.redIntensityProperty.value * scaleFactor ),
        Math.floor( model.greenIntensityProperty.value * scaleFactor ),
        Math.floor( model.blueIntensityProperty.value * scaleFactor ) ].join() + ')';
    }

    var ellipse = new Shape().ellipse( 0, 0, yRadius * 2, yRadius, 0 );
    var path = new Path( ellipse,
      {
        fill: getRGB(),
        lineWidth: 0.5,
        stroke: strokeColor,
        centerX: centerX,
        centerY: centerY
      } );

    // add listeners
    var listener = function() { path.fill = getRGB(); };
    model.redIntensityProperty.link( listener );
    model.greenIntensityProperty.link( listener );
    model.blueIntensityProperty.link( listener );

    this.addChild( path );

  }

  return inherit( Node, ColorVisionEllipse );
} );
