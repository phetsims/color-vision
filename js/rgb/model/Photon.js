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
  var Poolable = require( 'PHET_CORE/Poolable' );
  var Vector2 = require( 'DOT/Vector2' );
  var Constants = require( 'COLOR_VISION/ColorVisionConstants' );

  // constants
  var xVelocity = -4 * 60;
  var fanFactor = 1.05;
  var halfFanFactor = fanFactor / 2;

  /**
   * @param {Vector2} location
   * @param {Vector2} velocity
   * @param {Number} value between 0-255 for rgb intensity
   # @constructor
   */
  function Photon( location, velocity, intensity ) {
    this.location = location;
    this.velocity = velocity;
    this.intensity = intensity;
  }

  Photon.prototype = {
    updateAnimationFrame: function( dt ) {
      this.location.x = this.location.x + dt * this.velocity.x;
      this.location.y = this.location.y + dt * this.velocity.y;
    }
  };

  /* jshint -W064 */
  Poolable( Photon, {
    // Use a pool size of 50. This number was chosen because logging the size of the pool
    // revealed that with all the photon beams going at full blast, there are usually somewhere
    // between 10 and 35 photons in the pool at a time, so 50 seemed like a reasonable upper bound.
    maxPoolSize: 50, // 50 is the default value, show explicitly here for clarity
    initialSize: 50, // fill the pool to start, so photons are ready to go when the beams turn on
    defaultFactory: function() {
      return new Photon( new Vector2(), new Vector2( xVelocity, 0 ), 0 );
    },
    constructorDuplicateFactory: function( pool ) {
      return function( size, intensity ) {
        var yVelocity = ( Math.random() * fanFactor - halfFanFactor ) * 60;
        var yLocation = yVelocity * ( 25 / 60 ) + ( Constants.BEAM_HEIGHT / 2 );
        if ( pool.length ) {
          var photon = pool.pop();
          photon.intensity = intensity;
          photon.location.y = yLocation;
          photon.location.x = size;

          // set y velocity to determine how much fanning, x velocity is constant
          photon.velocity.y = yVelocity;
          return photon;
        }
        else {
          return new Photon( new Vector2( size, yLocation ), new Vector2( xVelocity, yVelocity ), intensity );
        }
      };
    }
  } );

  return Photon;
} );
