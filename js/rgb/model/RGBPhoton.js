// Copyright 2014-2017, University of Colorado Boulder

/**
 * Model of a photon for RGB screen.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {Vector2} location
   * @param {Vector2} velocity
   * @param {number} intensity between 0-255 for rgb intensity
   * @constructor
   */
  function RGBPhoton( location, velocity, intensity ) {

    // @public
    this.location = location;
    this.velocity = velocity;
    this.intensity = intensity;
  }

  colorVision.register( 'RGBPhoton', RGBPhoton );

  return inherit( Object, RGBPhoton, {
      updateAnimationFrame: function( newX, newY ) {
        this.location.x = newX;
        this.location.y = newY;
      }
    }
  );
} );
