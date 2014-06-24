// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model of a photon. Pooling is used in this class to reduce the number of heap
 * allocations that occur every second, and the overhead of the extra garbage collection.
 * SingleBulbPhoton inherits from RGBPhoton, and add a few new attributes.
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
   * @param {Number} intensity between 0-1 for color alpha value
   * @param {Color} color
   * @param {boolean} isWhite
   # @constructor
   */
  function SingleBulbPhoton( location, velocity, intensity, color, isWhite ) {

    RGBPhoton.call( this, location, velocity, intensity );

    this.passedFilter = false;

    // the "wasWhite" attribute is needed to determine the intensity of a photon passing through the filter.
    // White photons passing through must be changed to match the filter color, but keep full intensity.
    // Colored photons must loose intensity when passing through the filter.
    this.isWhite = this.wasWhite = isWhite;
    this.color = color;
  }

  // inherit must be called before Poolable for the prototype to work correctly
  var type = inherit( RGBPhoton, SingleBulbPhoton );

  /* jshint -W064 */
  Poolable( SingleBulbPhoton, {
    // Use a pool size of 150. This number is greater than that in RGBPhoton, because many
    // more photons end up in the pool when the filter is on
    maxPoolSize: 150,
    initialSize: 150, // fill the pool to start, so photons are ready to go when the beams turn on
    defaultFactory: function() {
      return new SingleBulbPhoton( new Vector2(), new Vector2( Constants.X_VELOCITY, 0 ), 0, new Color( 0, 0, 0, 1 ) );
    },
    constructorDuplicateFactory: function( pool ) {
      return function( x, intensity, color, isWhite ) {
        var yVelocity = ( Math.random() * Constants.FAN_FACTOR - ( Constants.FAN_FACTOR / 2 ) ) * 60;
        var y = yVelocity * ( 25 / 60 ) + ( Constants.BEAM_HEIGHT / 2 );

        if ( pool.length ) {
          var photon = pool.pop();
          photon.intensity = intensity;
          photon.location.x = x;
          photon.location.y = y;

          // attributes not present in RGBPhoton
          photon.isWhite = photon.wasWhite = isWhite;
          photon.passedFilter = false;
          photon.color = color;

          // set y velocity to determine how much fanning, x velocity is constant
          photon.velocity.y = yVelocity;
          return photon;
        }
        else {
          return new SingleBulbPhoton( new Vector2( x, y ), new Vector2( Constants.X_VELOCITY, yVelocity ), intensity, color, isWhite );
        }
      };
    }
  } );

  return type;
} );
