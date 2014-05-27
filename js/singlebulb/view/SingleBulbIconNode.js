// Copyright 2002-2013, University of Colorado Boulder

/**
 * SingleBulbIconNode - for navbar and homepage icons
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var FlashlightNode = require( 'COLOR_VISION/common/view/FlashlightNode' );

  /**
   * @constructor
   */
  function SingleBulbIconNode() {

    Node.call( this );

    var rectangle = new Rectangle( 0, 0, 548, 373, { fill: 'black' } );
    var flashlightNode = new FlashlightNode( 0, 'yellow' );
    flashlightNode.centerX = rectangle.centerX;
    flashlightNode.centerY = rectangle.centerY;

    rectangle.addChild( flashlightNode );
    this.addChild( rectangle );
  }

  return inherit( Node, SingleBulbIconNode );
} );
