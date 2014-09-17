// Copyright 2002-2014, University of Colorado Boulder

/**
 * Icon for the 'RGB' screen.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var FlashlightNode = require( 'COLOR_VISION/common/view/FlashlightNode' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function RGBIconNode( options ) {

    Rectangle.call( this, 0, 0, 548, 373, options );

    var redFlashlight = new FlashlightNode( -Math.PI / 12, 'red' );
    var greenFlashlight = new FlashlightNode( 0, 'green' );
    var blueFlashlight = new FlashlightNode( Math.PI / 12, 'blue' );

    var flashlightVBox = new VBox(
      {
        children: [
          redFlashlight,
          greenFlashlight,
          blueFlashlight ],
        spacing: -4,
        centerX: this.centerX,
        centerY: this.centerY
      } );

    this.addChild( flashlightVBox );
  }

  return inherit( Rectangle, RGBIconNode );
} );
