// Copyright 2014-2020, University of Colorado Boulder

/**
 * FlashlightNode - for use inside icons for both screens
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */

import Shape from '../../../../kite/js/Shape.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import flashlightImage from '../../../images/flashlight-icon_png.js';
import colorVision from '../../colorVision.js';

// constants
const SCALE = 0.75;

class FlashlightNode extends Node {

  /**
   * @param {number} rotation
   * @param {string} color - an rgb string or other legitimate color string
   * @param {Object} [options]
   */
  constructor( rotation, color, options ) {

    super( { rotation: rotation } );

    // draw the flashlight image, with the bulb pointed toward the left
    const flashlightNode = new Image( flashlightImage, { scale: SCALE } );

    // values used for drawing the beam shape
    const startX = flashlightNode.left + 15;       // start drawing the beam to the left of the flashlight
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

    this.addChild( new Path( beamShape, { fill: color } ) );
    this.addChild( flashlightNode );

    this.mutate( options );
  }
}

colorVision.register( 'FlashlightNode', FlashlightNode );

export default FlashlightNode;