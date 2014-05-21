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

  function FlashlightNode( rotation, color ) {

    Node.call( this );

    var rectangle = new Rectangle( 0, 0, 50, 25, { rotation: rotation } );
    var flashlightImage = new Image( flashlight,
      {
        scale: 0.12,
        left: rectangle.centerX,
        centerY: rectangle.centerY,
      } );

    rectangle.addChild( flashlightImage );

    var startX = flashlightImage.left + 2;
    var centerY = flashlightImage.centerY + 0.5;
    var beamShape = new Shape().
      moveTo( startX, centerY + 3 ).
      lineTo( startX - 20, centerY + 6 ).
      lineTo( startX - 20, centerY - 6 ).
      lineTo( startX, centerY - 3 ).
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
