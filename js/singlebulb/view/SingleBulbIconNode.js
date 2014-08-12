// Copyright 2002-2014, University of Colorado Boulder

/**
 * Icon for the 'Single Bulb' screen.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var FlashlightNode = require( 'COLOR_VISION/common/view/FlashlightNode' );

  /**
   * @param {Object} options
   * @constructor
   */
  function SingleBulbIconNode( options ) {
    Rectangle.call( this, options.lineWidth / 2, options.lineWidth / 2, 548 - options.lineWidth, 373 - options.lineWidth, options );
    this.addChild( new FlashlightNode( 0, 'yellow', { centerX: this.centerX, centerY: this.centerY } ) );
  }

  return inherit( Rectangle, SingleBulbIconNode );
} );
