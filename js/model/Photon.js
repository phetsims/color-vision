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
  function Photon( location, velocity ) {
    this.location = location;
    this.velocity = velocity;
  }

  var updateAnimationFrame = function( dt ) {
    // this.location = this.location.plus( this.velocity );
    this.location.x = this.location.x + this.velocity.x;
    this.location.y = this.location.y + this.velocity.y;
  };

  return inherit( PropertySet, Photon, { updateAnimationFrame: updateAnimationFrame } );
} );
