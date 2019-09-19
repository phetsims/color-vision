// Copyright 2014-2017, University of Colorado Boulder

/**
 * Model of a photon for RGB screen.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const colorVision = require( 'COLOR_VISION/colorVision' );
  const inherit = require( 'PHET_CORE/inherit' );
  const PhetioObject = require( 'TANDEM/PhetioObject' );

  /**
   * @param {Vector2} location
   * @param {Vector2} velocity
   * @param {number} intensity between 0-255 for rgb intensity
   * @param {Object} [options]
   * @constructor
   */
  function RGBPhoton( location, velocity, intensity, options ) {

    // @public
    this.location = location;
    this.velocity = velocity;
    this.intensity = intensity;

    PhetioObject.call( this, options );
  }

  colorVision.register( 'RGBPhoton', RGBPhoton );

  return inherit( PhetioObject, RGBPhoton, {
      updateAnimationFrame: function( newX, newY ) {
        this.location.x = newX;
        this.location.y = newY;
      }
    }
  );
} );
