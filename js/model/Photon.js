// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model of a photon.
 * The photon has fixed velocity, and a mutable location, orientation and color.
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
   * @param {Number} orientation in radians
   * @param {Color} color
   */
  function Photon( location, velocity, orientation, color ) {

    PropertySet.call( this,
      {
        location: location,
        orientation: orientation,
        color: color
      } );
    this.velocity = velocity;
  }

  var updateAnimationFrame = function( dt ) {
    this.location = this.location.plus( this.velocity );
  };

  return inherit( PropertySet, Photon, { updateAnimationFrame: updateAnimationFrame } );
} );
