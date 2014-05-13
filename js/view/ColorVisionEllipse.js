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

    var ellipse = new Shape().ellipse( 0, 0, yRadius * 2, yRadius, 0 );
    var path = new Path( ellipse,
      {
        fill: 'gray',
        lineWidth: 0.5,
        stroke: strokeColor,
        centerX: centerX,
        centerY: centerY
      } );

    this.addChild( path );

  }

  return inherit( Node, ColorVisionEllipse );
} );
