// Copyright 2014-2015, University of Colorado Boulder

/**
 * FlashlightWireNode forms the wire from the flashlight to the bulb color slider.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const colorVision = require( 'COLOR_VISION/colorVision' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Shape = require( 'KITE/Shape' );

  /**
   * @param {Vector2} start
   * @param {Vector2} end
   * @param {number} width the distance the wire extends beyond the flashlight before turning up to the slider
   * @constructor
   */
  function FlashlightWireNode( start, end, width ) {

    const radius = 5;
    const wire = new Shape()
      .moveTo( start.x, start.y )
      .lineTo( start.x + width - radius, start.y )
      .arc( start.x + width - radius, start.y - radius, radius, Math.PI / 2, 0, true )
      .lineTo( start.x + width, end.y + radius )
      .arc( start.x + width - radius, end.y + radius, radius, 0, 3 * Math.PI / 2, true )
      .lineTo( end.x, end.y );

    Path.call( this, wire,
      {
        lineWidth: 5,
        stroke: '#999999',
        lineJoin: 'round'
      } );
  }

  colorVision.register( 'FlashlightWireNode', FlashlightWireNode );

  return inherit( Path, FlashlightWireNode );
} );
