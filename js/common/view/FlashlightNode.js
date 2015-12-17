// Copyright 2014-2015, University of Colorado Boulder

/**
 * FlashlightNode - for use inside icons for both screens
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  // images
  var flashlightImage = require( 'image!COLOR_VISION/flashlight-icon.png' );

  // constants
  var SCALE = 0.75;

  /**
   * @param {number} rotation
   * @param {string} color - an rgb string or other legitimate color string
   * @param {Object} [options]
   # @constructor
   */
  function FlashlightNode( rotation, color, options ) {

    Node.call( this, { rotation: rotation } );

    // draw the flashlight image, with the bulb pointed toward the left
    var flashlightNode = new Image( flashlightImage, { scale: SCALE } );

    // values used for drawing the beam shape
    var startX = flashlightNode.left + 15;       // start drawing the beam to the left of the flashlight
    var centerY = flashlightNode.centerY + 0.5;  // centerY of beam and flashlight
    var dx = 170 * SCALE;                        // length of the beam in the x direction
    var dy = 25 * SCALE;                         // height of the small end of the beam (the large end is 2 * dy)

    // draw a trapeziodal beam shape, just to the left of the flashlight image
    var beamShape = new Shape().
      moveTo( startX, centerY + dy ).
      lineTo( startX - dx, centerY + dy * 2 ).
      lineTo( startX - dx, centerY - dy * 2 ).
      lineTo( startX, centerY - dy ).
      close();

    this.addChild( new Path( beamShape, { fill: color } ) );
    this.addChild( flashlightNode );

    this.mutate( options );
  }

  colorVision.register( 'FlashlightNode', FlashlightNode );

  return inherit( Node, FlashlightNode );
} );
