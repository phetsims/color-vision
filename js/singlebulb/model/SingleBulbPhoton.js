// Copyright 2014-2020, University of Colorado Boulder

/**
 * Model of a photon for single bulb screen.
 *
 * @author Aaron Davis
 */

import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import colorVision from '../../colorVision.js';
import RGBPhoton from '../../rgb/model/RGBPhoton.js';
import SingleBulbPhotonIO from './SingleBulbPhotonIO.js';

/**
 * @param {Vector2} position
 * @param {Vector2} velocity
 * @param {number} intensity between 0-1 for color alpha value
 * @param {Color} color
 * @param {boolean} isWhite
 * @param {number} wavelength
 * @param {Object} [options]
 * @constructor
 */
function SingleBulbPhoton( position, velocity, intensity, color, isWhite, wavelength, options ) {

  options = merge( { phetioType: SingleBulbPhotonIO }, options );
  RGBPhoton.call( this, position, velocity, intensity, options );

  // the "wasWhite" attribute is needed to determine the intensity of a photon passing through the filter.
  // White photons passing through must be changed to match the filter color, but keep full intensity.
  // Colored photons must lose intensity when passing through the filter.
  // @public
  this.isWhite = this.wasWhite = isWhite;
  this.color = color;
  this.wavelength = wavelength;
  this.passedFilter = false;
}

colorVision.register( 'SingleBulbPhoton', SingleBulbPhoton );

inherit( RGBPhoton, SingleBulbPhoton );
export default SingleBulbPhoton;
