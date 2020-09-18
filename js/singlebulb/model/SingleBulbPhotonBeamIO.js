// Copyright 2017-2020, University of Colorado Boulder

/**
 * IO Type for SingleBulbPhotonBeam.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Vector2IO from '../../../../dot/js/Vector2IO.js';
import ColorIO from '../../../../scenery/js/util/ColorIO.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import colorVision from '../../colorVision.js';

const SingleBulbPhotonBeamIO = new IOType( 'SingleBulbPhotonBeamIO', {
  isValidValue: v => v instanceof phet.colorVision.SingleBulbPhotonBeam,
  documentation: 'The Beam on the single bulb screen.',

  /**
   * Clears the children from the model so it can be deserialized.
   * @param {SingleBulbPhotonBeam} singleBulbPhotonBeam
   * @public
   // TODO: https://github.com/phetsims/tandem/issues/211 is never called
   */
  clearChildInstances( singleBulbPhotonBeam ) {
    while ( singleBulbPhotonBeam.photons.length > 0 ) {
      const p = singleBulbPhotonBeam.photons.pop();
      p.dispose();
    }
  },

  /**
   * Adds a photon beam as specified by the phetioID and state.
   * @param {SingleBulbPhotonBeam} singleBulbPhotonBeam
   * @param {Tandem} tandem
   * @param {Object} photonStateObject
   * @public
   * https://github.com/phetsims/tandem/issues/211
   */
  addChildElementDeprecated( singleBulbPhotonBeam, tandem, photonStateObject ) {

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
} );

colorVision.register( 'SingleBulbPhotonBeamIO', SingleBulbPhotonBeamIO );
export default SingleBulbPhotonBeamIO;
