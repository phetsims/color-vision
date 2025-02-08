// Copyright 2014-2025, University of Colorado Boulder

/**
 * FlashlightAndBeamNode - for use inside icons for both screens
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */

import Shape from '../../../../kite/js/Shape.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import colorVision from '../../colorVision.js';
import FlashlightNode from './FlashlightNode.js';

// constants
const SCALE = 0.75;

class FlashlightAndBeamNode extends Node {

  /**
   * @param {number} rotation
   * @param {string} color - an rgb string or other legitimate color string
   * @param {Object} [options]
   */
  constructor( rotation, color, options ) {

    super( { rotation: rotation } );

    // draw the flashlight image, with the bulb pointed toward the left
    const flashlightNode = new FlashlightNode( rotation );

    // values used for drawing the beam shape
    const startX = flashlightNode.left + 2.5;       // start drawing the beam to the right of the flashlight
    const centerY = flashlightNode.centerY + 0.5;  // centerY of beam and flashlight
    const dx = 170 * SCALE;                        // length of the beam in the x direction
    const dy = 25 * SCALE;                         // height of the small end of the beam (the large end is 2 * dy)

    // draw a trapezoidal beam shape, just to the left of the flashlight image
    const beamShape = new Shape()
      .moveTo( startX, centerY + dy )
      .lineTo( startX - dx, centerY + dy * 2 )
      .lineTo( startX - dx, centerY - dy * 2 )
      .lineTo( startX, centerY - dy )
      .close();
    const beamPath = new Path( beamShape, { fill: color } );

    // Add the beam node first. This ensures that the flashlight node (added next) will overlap and cover the initial
    // 2.5-pixel extension of the beam, creating the effect of the beam originating from within the flashlight.
    this.addChild( beamPath );
    this.addChild( flashlightNode );

    this.mutate( options );
  }
}

colorVision.register( 'FlashlightAndBeamNode', FlashlightAndBeamNode );

export default FlashlightAndBeamNode;