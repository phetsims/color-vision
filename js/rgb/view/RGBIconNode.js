// Copyright 2014-2015, University of Colorado Boulder

/**
 * Icon for the 'RGB' screen.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var inherit = require( 'PHET_CORE/inherit' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var FlashlightNode = require( 'COLOR_VISION/common/view/FlashlightNode' );
  var Screen = require( 'JOIST/Screen' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function RGBIconNode( options ) {

    Rectangle.call( this, 0, 0, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.width, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.height, options );

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

  colorVision.register( 'RGBIconNode', RGBIconNode );

  return inherit( Rectangle, RGBIconNode );
} );
