// Copyright 2017-2020, University of Colorado Boulder

/**
 * IO Type for SingleBulbPhoton.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */

import validate from '../../../../axon/js/validate.js';
import merge from '../../../../phet-core/js/merge.js';
import ObjectIO from '../../../../tandem/js/types/ObjectIO.js';
import colorVision from '../../colorVision.js';
import RGBPhotonIO from '../../rgb/model/RGBPhotonIO.js';

class SingleBulbPhotonIO extends ObjectIO {

  /**
   * Serializes an instance.
   * @param {SingleBulbPhoton} singleBulbPhoton
   * @returns {Object}
   * @public
   */
  static toStateObject( singleBulbPhoton ) {
    validate( singleBulbPhoton, this.validator );
    return merge( {
      isWhite: singleBulbPhoton.isWhite,
      color: singleBulbPhoton.color.toStateObject(),
      wavelength: singleBulbPhoton.wavelength,
      passedFilter: singleBulbPhoton.passedFilter
    }, RGBPhotonIO.toStateObject( singleBulbPhoton ) );
  }

  /**
   * Deserializes an instance. Not needed here since all children are created by the container.
   * @param {Object} stateObject
   * @returns {{}}
   * @public
   */
  static fromStateObject( stateObject ) {
    return {};
  }
}

SingleBulbPhotonIO.documentation = 'A Photon from a single bulb.';
SingleBulbPhotonIO.validator = { isValidValue: v => v instanceof phet.colorVision.SingleBulbPhoton };
SingleBulbPhotonIO.typeName = 'SingleBulbPhotonIO';
ObjectIO.validateSubtype( SingleBulbPhotonIO );

colorVision.register( 'SingleBulbPhotonIO', SingleBulbPhotonIO );
export default SingleBulbPhotonIO;