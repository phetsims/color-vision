// Copyright 2017-2020, University of Colorado Boulder

/**
 * IO type for SingleBulbPhotonBeam.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import validate from '../../../../axon/js/validate.js';
import Vector2IO from '../../../../dot/js/Vector2IO.js';
import ColorIO from '../../../../scenery/js/util/ColorIO.js';
import ObjectIO from '../../../../tandem/js/types/ObjectIO.js';
import colorVision from '../../colorVision.js';

class SingleBulbPhotonBeamIO extends ObjectIO {

  /**
   * Clears the children from the model so it can be deserialized.
   * @param {SingleBulbPhotonBeam} singleBulbPhotonBeam
   */
  static clearChildInstances( singleBulbPhotonBeam ) {
    validate( singleBulbPhotonBeam, this.validator );
    while ( singleBulbPhotonBeam.photons.length > 0 ) {
      const p = singleBulbPhotonBeam.photons.pop();
      p.dispose();
    }
  }

  /**
   * Adds a photon beam as specified by the phetioID and state.
   * @param {SingleBulbPhotonBeam} singleBulbPhotonBeam
   * @param {Tandem} tandem
   * @param {Object} photonStateObject
   */
  static addChildElementDeprecated( singleBulbPhotonBeam, tandem, photonStateObject ) {
    validate( singleBulbPhotonBeam, this.validator );

    // position, velocity, intensity, color, isWhite, wavelength, tandem
    const photonInstance = new phet.colorVision.SingleBulbPhoton(
      Vector2IO.fromStateObject( photonStateObject.position ),
      Vector2IO.fromStateObject( photonStateObject.velocity ),
      photonStateObject.intensity,
      ColorIO.fromStateObject( photonStateObject.color ),
      photonStateObject.isWhite,
      photonStateObject.wavelength, {
        tandem: tandem
      }
    );
    photonInstance.passedFilter = photonStateObject.passedFilter;
    singleBulbPhotonBeam.photons.push( photonInstance );
    singleBulbPhotonBeam.repaintEmitter.emit();
    return photonInstance;
  }
}

SingleBulbPhotonBeamIO.documentation = 'The Beam on the single bulb screen.';
SingleBulbPhotonBeamIO.validator = { isValidValue: v => v instanceof phet.colorVision.SingleBulbPhotonBeam };
SingleBulbPhotonBeamIO.typeName = 'SingleBulbPhotonBeamIO';
ObjectIO.validateSubtype( SingleBulbPhotonBeamIO );

colorVision.register( 'SingleBulbPhotonBeamIO', SingleBulbPhotonBeamIO );
export default SingleBulbPhotonBeamIO;
