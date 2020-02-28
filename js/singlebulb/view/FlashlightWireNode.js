// Copyright 2014-2020, University of Colorado Boulder

/**
 * FlashlightWireNode forms the wire from the flashlight to the bulb color slider.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */

import Shape from '../../../../kite/js/Shape.js';
import inherit from '../../../../phet-core/js/inherit.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import colorVision from '../../colorVision.js';

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

inherit( Path, FlashlightWireNode );
export default FlashlightWireNode;