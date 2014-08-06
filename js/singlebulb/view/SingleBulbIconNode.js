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
   * @param {String|Color} fill the fill for the background rectangle
   * @constructor
   */
  function SingleBulbIconNode( fill ) {
    Rectangle.call( this, 0, 0, 548, 373, { fill: fill } );
    this.addChild( new FlashlightNode( 0, 'yellow', { centerX: this.centerX, centerY: this.centerY } ) );
  }

  return inherit( Rectangle, SingleBulbIconNode );
} );
