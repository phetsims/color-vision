// Copyright 2002-2013, University of Colorado Boulder

/**
 * SingleBulbIconNode - for navbar and homepage icons
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  // images
  var flashlight = require( 'image!COLOR_VISION/flashlight.png' );

  function SingleBulbIconNode( width, height ) {

    Node.call( this );

    var rectangle = new Rectangle( 0, 0, 75, 50, { fill: 'black' } );
    var flashlightScale = 0.12;
    var flashlightNode = new Image( flashlight, { scale: flashlightScale, left: rectangle.centerX, centerY: rectangle.centerY } );

    rectangle.addChild( flashlightNode );

    var startX = flashlightNode.left;
    var centerY = flashlightNode.centerY + 0.5;
    var beamShape = new Shape().
      moveTo( startX, centerY + 3 ).
      lineTo( startX - 20, centerY + 6 ).
      lineTo( startX - 20, centerY - 6 ).
      lineTo( startX, centerY - 3 ).
      close();

    var beamNode = new Path( beamShape,
      {
        fill: 'yellow'
      } );
    rectangle.addChild( beamNode );

    this.addChild( rectangle );

  }

  return inherit( Node, SingleBulbIconNode );
} );
