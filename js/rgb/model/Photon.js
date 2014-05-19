// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model of a photon.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * @param {Vector2} location
   * @param {Vector2} velocity
   */
  function Photon( location, velocity, intensity ) {
    this.location = location;
    this.velocity = velocity;
    this.intensity = intensity;
  }

  var updateAnimationFrame = function( dt ) {
    this.location.x = this.location.x + this.velocity.x;
    this.location.y = this.location.y + this.velocity.y;
  };

  return inherit( PropertySet, Photon, { updateAnimationFrame: updateAnimationFrame } );
} );
