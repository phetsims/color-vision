// Copyright 2002-2013, University of Colorado Boulder

/**
 * FlashlightNode - for use inside icons for both screens
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  // images
  var flashlight = require( 'image!COLOR_VISION/flashlight.png' );

  /**
   * @param {Number} rotation
   * @param {String} color - an rgb string or other legitimate color string
   # @constructor
   */
  function FlashlightNode( rotation, color, options ) {

    Node.call( this, { rotation: rotation } );

    var scale = 0.8;
    var flashlightImage = new Image( flashlight,
      {
        scale: scale,
        left: this.centerX,
        centerY: this.centerY
      } );

    var startX = flashlightImage.left + 15;
    var centerY = flashlightImage.centerY + 0.5;
    var dx = 20 / 0.12 * scale;
    var dy = 3 / 0.12 * scale;
    var beamShape = new Shape().
      moveTo( startX, centerY + dy ).
      lineTo( startX - dx, centerY + dy * 2 ).
      lineTo( startX - dx, centerY - dy * 2 ).
      lineTo( startX, centerY - dy ).
      close();

    var beamNode = new Path( beamShape,
      {
        fill: color
      } );

    this.addChild( beamNode );
    this.addChild( flashlightImage );

    this.mutate( options );
  }

  return inherit( Node, FlashlightNode );
} );
