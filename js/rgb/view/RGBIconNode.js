// Copyright 2002-2013, University of Colorado Boulder

/**
 * RGBIconNode - for navbar and homepage icons
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var FlashlightNode = require( 'COLOR_VISION/common/view/FlashlightNode' );

  // images
  var flashlightDown = require( 'image!COLOR_VISION/flashlight-down.png' );
  var flashlight = require( 'image!COLOR_VISION/flashlight.png' );
  var flashlightUp = require( 'image!COLOR_VISION/flashlight-up.png' );

  function RGBIconNode() {

    Node.call( this );

    var rectangle = new Rectangle( 0, 0, 75, 50, { fill: 'black' } );

    var redFlashlight = new FlashlightNode( -Math.PI / 6, 'red' );
    var greenFlashlight = new FlashlightNode( 0, 'green' );
    var blueFlashlight = new FlashlightNode( Math.PI / 6, 'blue' );

    var flashlightVBox = new VBox(
      {
        children: [
          redFlashlight,
          greenFlashlight,
          blueFlashlight ],
        spacing: -20,
        right: rectangle.right - 5,
        centerY: rectangle.centerY + 3
      } );

    rectangle.addChild( flashlightVBox );
    this.addChild( rectangle );

  }

  return inherit( Node, RGBIconNode );
} );
