// Copyright 2014-2017, University of Colorado Boulder

/**
 * FlashlightNode - for use inside icons for both screens
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const colorVision = require( 'COLOR_VISION/colorVision' );
  const Image = require( 'SCENERY/nodes/Image' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Shape = require( 'KITE/Shape' );

  // images
  const flashlightImage = require( 'image!COLOR_VISION/flashlight-icon.png' );

  // constants
  const SCALE = 0.75;

  /**
   * @param {number} rotation
   * @param {string} color - an rgb string or other legitimate color string
   * @param {Object} [options]
   * @constructor
   */
  function FlashlightNode( rotation, color, options ) {

    Node.call( this, { rotation: rotation } );

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

  colorVision.register( 'FlashlightNode', FlashlightNode );

  return inherit( Node, FlashlightNode );
} );
