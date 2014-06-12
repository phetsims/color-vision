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
  var RGBPhoton = require( 'COLOR_VISION/rgb/model/RGBPhoton' );
  var Constants = require( 'COLOR_VISION/ColorVisionConstants' );
  var Poolable = require( 'PHET_CORE/Poolable' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Vector2} location
   * @param {Vector2} velocity
   * @param {Number} value between 0-1 for color alpha value
   * @param {Color} color
   * @param {boolean} isWhite
   # @constructor
   */
  function SingleBulbPhoton( location, velocity, intensity, color, isWhite ) {

    RGBPhoton.call( this, location, velocity, intensity );

    this.passedFilter = false;
    this.isWhite = this.wasWhite = isWhite;
    this.color = color;
  }

  // inherit must be called before Poolable for the prototype to work correctly
  var type = inherit( RGBPhoton, SingleBulbPhoton );

  /* jshint -W064 */
  Poolable( SingleBulbPhoton, {
    // Use a pool size of 50. This number was chosen because logging the size of the pool
    // revealed that with all the photon beams going at full blast, there are usually somewhere
    // between 10 and 35 photons in the pool at a time, so 50 seemed like a reasonable upper bound.
    maxPoolSize: 50, // 50 is the default value, show explicitly here for clarity
    initialSize: 50, // fill the pool to start, so photons are ready to go when the beams turn on
    defaultFactory: function() {
      return new SingleBulbPhoton( new Vector2(), new Vector2( Constants.X_VELOCITY, 0 ), 0, new Color( 0, 0, 0, 1 ) );
    },
    constructorDuplicateFactory: function( pool ) {
      return function( size, intensity, color, isWhite ) {
        var yVelocity = ( Math.random() * Constants.FAN_FACTOR - ( Constants.FAN_FACTOR / 2 ) ) * 60;
        var yLocation = yVelocity * ( 25 / 60 ) + ( Constants.BEAM_HEIGHT / 2 );

        if ( pool.length ) {
          var photon = pool.pop();
          photon.intensity = intensity;
          photon.location.y = yLocation;
          photon.location.x = size;

          // attributes not present in RGBPhoton
          photon.isWhite = photon.wasWhite = isWhite;
          photon.passedFilter = false;
          photon.color = color;

          // set y velocity to determine how much fanning, x velocity is constant
          photon.velocity.y = yVelocity;
          return photon;
        }
        else {
          return new SingleBulbPhoton( new Vector2( size, yLocation ), new Vector2( Constants.X_VELOCITY, yVelocity ), intensity, color, isWhite );
        }
      };
    }
  } );

  return type;
} );
