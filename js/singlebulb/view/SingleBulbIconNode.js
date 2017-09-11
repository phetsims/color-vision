// Copyright 2014-2015, University of Colorado Boulder

/**
 * Icon for the 'Single Bulb' screen.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var FlashlightNode = require( 'COLOR_VISION/common/view/FlashlightNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function SingleBulbIconNode( options ) {
    Rectangle.call( this, 0, 0, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.width, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.height, options );
    this.addChild( new FlashlightNode( 0, 'yellow', { centerX: this.centerX, centerY: this.centerY } ) );
  }

  colorVision.register( 'SingleBulbIconNode', SingleBulbIconNode );

  return inherit( Rectangle, SingleBulbIconNode );
} );
