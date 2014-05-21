// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model of a photon.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

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

  var updateAnimationFrame = function( dt ) {
    this.location.x = this.location.x + dt * this.velocity.x;
    this.location.y = this.location.y + dt * this.velocity.y;
  };

  return inherit( PropertySet, Photon, { updateAnimationFrame: updateAnimationFrame } );
} );
