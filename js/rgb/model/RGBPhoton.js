// Copyright 2014-2019, University of Colorado Boulder

/**
 * Model of a photon for RGB screen.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import colorVision from '../../colorVision.js';

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

export default inherit( PhetioObject, RGBPhoton, {
    updateAnimationFrame: function( newX, newY ) {
      this.location.x = newX;
      this.location.y = newY;
    }
  }
);