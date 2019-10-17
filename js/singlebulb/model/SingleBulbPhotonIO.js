// Copyright 2017-2019, University of Colorado Boulder

/**
 * IO type for SingleBulbPhoton.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const colorVision = require( 'COLOR_VISION/colorVision' );
  const merge = require( 'PHET_CORE/merge' );
  const ObjectIO = require( 'TANDEM/types/ObjectIO' );
  const RGBPhotonIO = require( 'COLOR_VISION/rgb/model/RGBPhotonIO' );
  const validate = require( 'AXON/validate' );

  class SingleBulbPhotonIO extends ObjectIO {

    /**
     * Serializes an instance.
     * @param {SingleBulbPhoton} singleBulbPhoton
     * @returns {Object}
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
     */
    static fromStateObject( stateObject ) {
      return {};
    }
  }

  SingleBulbPhotonIO.documentation = 'A Photon from a single bulb.';
  SingleBulbPhotonIO.validator = { isValidValue: v => v instanceof phet.colorVision.SingleBulbPhoton };
  SingleBulbPhotonIO.typeName = 'SingleBulbPhotonIO';
  ObjectIO.validateSubtype( SingleBulbPhotonIO );

  return colorVision.register( 'SingleBulbPhotonIO', SingleBulbPhotonIO );
} );