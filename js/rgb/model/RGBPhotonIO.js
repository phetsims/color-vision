// Copyright 2017-2019, University of Colorado Boulder

/**
 * IO type for RGBPhoton.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */

import validate from '../../../../axon/js/validate.js';
import Vector2IO from '../../../../dot/js/Vector2IO.js';
import ObjectIO from '../../../../tandem/js/types/ObjectIO.js';
import colorVision from '../../colorVision.js';
import RGBPhoton from './RGBPhoton.js';

class RGBPhotonIO extends ObjectIO {

  /**
   * Serializes an instance.
   * @param {RGBPhoton} rgbPhoton
   * @returns {Object}
   */
  static toStateObject( rgbPhoton ) {
    validate( rgbPhoton, this.validator );
    return {
      location: Vector2IO.toStateObject( rgbPhoton.location ),
      velocity: Vector2IO.toStateObject( rgbPhoton.velocity ),
      intensity: rgbPhoton.intensity
    };
  }

  /**
   * Deserializes an instance.
   * @param {Object} stateObject
   * @returns {RGBPhoton}
   */
  static fromStateObject( stateObject ) {
    return new RGBPhoton(
      Vector2IO.fromStateObject( stateObject.location ),
      Vector2IO.fromStateObject( stateObject.velocity ),
      stateObject.intensity
    );
  }
}

RGBPhotonIO.validator = { valueType: RGBPhoton };
RGBPhotonIO.documentation = 'A Photon that has R, G, and B';
RGBPhotonIO.typeName = 'RGBPhotonIO';
ObjectIO.validateSubtype( RGBPhotonIO );

colorVision.register( 'RGBPhotonIO', RGBPhotonIO );
export default RGBPhotonIO;