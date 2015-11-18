// Copyright 2014-2015, University of Colorado Boulder

/**
 * Model of a photon for RGB screen.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Vector2} location
   * @param {Vector2} velocity
   * @param {Number} intensity between 0-255 for rgb intensity
   # @constructor
   */
  function RGBPhoton( location, velocity, intensity ) {

    // @public
    this.location = location;
    this.velocity = velocity;
    this.intensity = intensity;
  }

  // make this object globally accessible in support of together.js
  window.phet = window.phet || {};
  window.phet.colorVision = window.phet.colorVision || {};
  window.phet.colorVision.RGBPhoton = RGBPhoton;

  return inherit( Object, RGBPhoton, {
      updateAnimationFrame: function( newX, newY ) {
        this.location.x = newX;
        this.location.y = newY;
      },

      toStateObject: function() {
        return {
          location: this.location.toStateObject(),
          velocity: this.velocity.toStateObject(),
          intensity: this.intensity
        };
      }
    },
    // statics
    {
      fromStateObject: function( stateObject ) {
        return new RGBPhoton( Vector2.fromStateObject( stateObject.location ), Vector2.fromStateObject( stateObject.velocity ),
          stateObject.intensity );
      }
    }
  );
} );
