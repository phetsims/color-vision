// Copyright 2002-2013, University of Colorado Boulder

/**
 * FlashlightNode - for use inside icons for both pages
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
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // images
  var flashlight = require( 'image!COLOR_VISION/flashlight.png' );

  /**
   * @param {Number} rotation
   * @param {String} color - an rgb string or other legitimate color string
   # @constructor
   */
  function FlashlightNode( rotation, color ) {

    Node.call( this );

    var scale = 0.8;
    var rectangle = new Node( { rotation: rotation} );
    var flashlightImage = new Image( flashlight,
      {
        scale: scale,
        left: rectangle.centerX,
        centerY: rectangle.centerY
      } );

    rectangle.addChild( flashlightImage );

    var startX = flashlightImage.left + 2;
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
    rectangle.addChild( beamNode );
    this.addChild( rectangle );

  }

  return inherit( Node, FlashlightNode );
} );
