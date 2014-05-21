// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model of a photon.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Poolable = require( 'PHET_CORE/Poolable' );
  var Vector2 = require( 'DOT/Vector2' );
  var Constants = require( 'COLOR_VISION/ColorVisionConstants' );

  // contants
  var xVelocity = -4 * 60;
  var fanFactor = 1.2;
  var halfFanFactor = fanFactor / 2;

  /**
   * @param {Vector2} location
   * @param {Vector2} velocity
   * @param {Number} value between 0-255 for rgb intensity
   # @constructor
   */
  function Photon( location, velocity, intensity, startX ) {
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

  Poolable( Photon, {
    maxPoolSize: 100,
    initialSize: 100,
    defaultFactory: function() {
      return new Photon( new Vector2(), new Vector2( xVelocity, 0 ), 0 );
    },
    constructorDuplicateFactory: function( pool ) {
      return function( size, intensity ) {
        var yVelocity = Math.random() * fanFactor - halfFanFactor;
        var yLocation = yVelocity * 25 + ( Constants.BEAM_HEIGHT / 2 );
        yVelocity *= 60;
        if ( pool.length ) {
          var photon = pool.pop();
          photon.intensity = intensity;
          photon.location.y = yLocation;
          photon.location.x = size;
          photon.velocity.y = yVelocity;
          return photon;
        } else {
          return new Photon( new Vector2( size, yLocation ), new Vector2( xVelocity, yVelocity ), intensity );
        }
      };
    }
  } );

  return Photon;
} );
