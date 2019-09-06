// Copyright 2017-2019, University of Colorado Boulder

/**
 * IO type for SingleBulbPhotonBeam.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var ColorIO = require( 'SCENERY/util/ColorIO' );
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var ObjectIO = require( 'TANDEM/types/ObjectIO' );
  var Vector2IO = require( 'DOT/Vector2IO' );
  var validate = require( 'AXON/validate' );

  class SingleBulbPhotonBeamIO extends ObjectIO {

    /**
     * Clears the children from the model so it can be deserialized.
     * @param {SingleBulbPhotonBeam} singleBulbPhotonBeam
     */
    static clearChildInstances( singleBulbPhotonBeam ) {
      validate( singleBulbPhotonBeam, this.validator );
      while ( singleBulbPhotonBeam.photons.length > 0 ) {
        var p = singleBulbPhotonBeam.photons.pop();
        p.dispose();
      }
    }

    /**
     * Adds a photon beam as specified by the phetioID and state.
     * @param {SingleBulbPhotonBeam} singleBulbPhotonBeam
     * @param {Tandem} tandem
     * @param {Object} photonStateObject
     */
    static addChildInstance( singleBulbPhotonBeam, tandem, photonStateObject ) {
      validate( singleBulbPhotonBeam, this.validator );

      // location, velocity, intensity, color, isWhite, wavelength, tandem
      var photonInstance = new phet.colorVision.SingleBulbPhoton(
        Vector2IO.fromStateObject( photonStateObject.location ),
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
    }
  }

  SingleBulbPhotonBeamIO.documentation = 'The Beam on the single bulb screen.';
  SingleBulbPhotonBeamIO.validator = { isValidValue: v => v instanceof phet.colorVision.SingleBulbPhotonBeam };
  SingleBulbPhotonBeamIO.typeName = 'SingleBulbPhotonBeamIO';
  ObjectIO.validateSubtype( SingleBulbPhotonBeamIO );

  return colorVision.register( 'SingleBulbPhotonBeamIO', SingleBulbPhotonBeamIO );
} );