// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model of a photon. Pooling is used in this class to reduce the number of heap
 * allocations that occur every second, and the overhead of the extra garbage collection.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Color = require( 'SCENERY/util/Color' );

  /**
   * @param {Vector2} location
   * @param {Vector2} velocity
   * @param {Number} value between 0-255 for rgb intensity
   * @param {Color} color
   # @constructor
   */
  function SingleBulbPhoton( location, velocity, intensity, color ) {

    RGBPhoton.call( this, location, velocity, intensity );

    this.passedFilter = false;
    this.isWhite = this.wasWhite = ( Color.toColor( color ).equals( Color.WHITE ) );
    this.color = color;
  }

  return inherit( RGBPhoton, SingleBulbPhoton );
} );
