// Copyright 2002-2013, University of Colorado Boulder

/**
 * Photon beam
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // images
  var flashlightDown = require( 'image!COLOR_VISION/flashlight-down.png' );
  var flashlight = require( 'image!COLOR_VISION/flashlight.png' );
  var flashlightUp = require( 'image!COLOR_VISION/flashlight-up.png' );

  function RGBIconNode( width, height ) {

    Node.call( this );

    var rectangle = new Rectangle( 0, 0, 75, 50 );
    var flashlightScale = 0.12;
    var redFlashlight = new Image( flashlightDown, { scale: flashlightScale } );
    var greenFlashlight = new Image( flashlight, { scale: flashlightScale } );
    var blueFlashlight = new Image( flashlightUp, { scale: flashlightScale } );

    var flashlightVBox = new VBox(
      {
        children: [
          redFlashlight,
          greenFlashlight,
          blueFlashlight ],
        spacing: 5,
        right: rectangle.right,
        centerY: rectangle.centerY
      } );

    rectangle.addChild( flashlightVBox );
    this.addChild( rectangle );

  }

  return inherit( Node, RGBIconNode );
} );
