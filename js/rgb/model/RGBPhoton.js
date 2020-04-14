// Copyright 2014-2020, University of Colorado Boulder

/**
 * Model of a photon for RGB screen.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import colorVision from '../../colorVision.js';

/**
 * @param {Vector2} position
 * @param {Vector2} velocity
 * @param {number} intensity between 0-255 for rgb intensity
 * @param {Object} [options]
 * @constructor
 */
function RGBPhoton( position, velocity, intensity, options ) {

  // @public
  this.position = position;
  this.velocity = velocity;
  this.intensity = intensity;

  PhetioObject.call( this, options );
}

colorVision.register( 'RGBPhoton', RGBPhoton );

export default inherit( PhetioObject, RGBPhoton, {
    updateAnimationFrame: function( newX, newY ) {
      this.position.x = newX;
      this.position.y = newY;
    }
  }
);
