// Copyright 2002-2013, University of Colorado Boulder

/**
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {Vector2} start
   * @param {Vector2} end
   * @param {Number} width
   * @constructor
   */
  function FlashlightWireNode( start, end, width ) {

    var radius = 5;
    var wire = new Shape()
      .moveTo( start.x, start.y )
      .lineTo( start.x + width - radius, start.y )
      .arc( start.x + width - radius, start.y - radius, radius, Math.PI / 2, 0, true )
      .lineTo( start.x + width, end.y + radius )
      .arc( start.x + width - radius, end.y + radius, radius, 0, -Math.PI / 2, true )
      .lineTo( end.x , end.y );

    Path.call( this, wire,
      {
        lineWidth: 5,
        stroke: '#999999',
        lineJoin: 'round'
      } );
  }

  return inherit( Path, FlashlightWireNode );
} );
