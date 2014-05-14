// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model of a photon.
 * The photon has fixed velocity and color, and a mutable location, orientation and intensity.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Vector2} location
   * @param {Vector2} velocity
   * @param {Dimension2} size
   * @param {Number} orientation in radians
   * @param {Number} intensity of color, must be in [0, 100]
   * @param {String} color, must be one of 'red', 'green', 'blue'
   */
  function Photon( location, orientation, velocity, intensity, color ) {
    PropertySet.call( this,
      {
        location: location,
        orientation: orientation,
        intensity: intensity
      } );
    this.velocity = velocity;
    this.color = color;
  }

  var updateAnimationFrame = function( dt ) {
    console.log( dt );
    this.location = this.location.plus( this.velocity );
  };

  return inherit( PropertySet, Photon, { updateAnimationFrame: updateAnimationFrame } );
} );
