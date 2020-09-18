// Copyright 2017-2020, University of Colorado Boulder

/**
 * IO Type for SingleBulbPhoton.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */

import merge from '../../../../phet-core/js/merge.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import colorVision from '../../colorVision.js';
import RGBPhotonIO from '../../rgb/model/RGBPhotonIO.js';

const SingleBulbPhotonIO = new IOType( 'SingleBulbPhotonIO', {
  isValidValue: v => v instanceof phet.colorVision.SingleBulbPhoton,
  documentation: 'A Photon from a single bulb.',
  /**
   * Serializes an instance.
   * @param {SingleBulbPhoton} singleBulbPhoton
   * @returns {Object}
   * @public
   */
  toStateObject( singleBulbPhoton ) {
    return merge( {
      isWhite: singleBulbPhoton.isWhite,
      color: singleBulbPhoton.color.toStateObject(),
      wavelength: singleBulbPhoton.wavelength,
      passedFilter: singleBulbPhoton.passedFilter
    }, RGBPhotonIO.toStateObject( singleBulbPhoton ) );
  },

  /**
   * Deserializes an instance. Not needed here since all children are created by the container.
   * @param {Object} stateObject
   * @returns {{}}
   * @public
   */
  fromStateObject( stateObject ) {
    return {};
  }
} );

colorVision.register( 'SingleBulbPhotonIO', SingleBulbPhotonIO );
export default SingleBulbPhotonIO;