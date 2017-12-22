// Copyright 2017, University of Colorado Boulder

/**
 * IO type for SingleBulbPhotonBeam.
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var ColorIO = require( 'SCENERY/util/ColorIO' );
  var Vector2IO = require( 'DOT/Vector2IO' );

  // phet-io modules
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertInstanceOf' );
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var ObjectIO = require( 'ifphetio!PHET_IO/types/ObjectIO' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );

  /**
   * @param {SingleBulbPhotonBeam} singleBulbPhotonBeam
   * @param {string} phetioID
   * @constructor
   */
  function SingleBulbPhotonBeamIO( singleBulbPhotonBeam, phetioID ) {
    assert && assertInstanceOf( singleBulbPhotonBeam, phet.colorVision.SingleBulbPhotonBeam );
    ObjectIO.call( this, singleBulbPhotonBeam, phetioID );
  }

  phetioInherit( ObjectIO, 'SingleBulbPhotonBeamIO', SingleBulbPhotonBeamIO, {}, {
    documentation: 'The Beam on the single bulb screen.',

    /**
     * Clears the children from the model so it can be deserialized.
     * @param {SingleBulbPhotonBeam} singleBulbPhotonBeam
     */
    clearChildInstances: function( singleBulbPhotonBeam ) {
      assert && assertInstanceOf( singleBulbPhotonBeam, phet.colorVision.SingleBulbPhotonBeam );
      while ( singleBulbPhotonBeam.photons.length > 0 ) {
        var p = singleBulbPhotonBeam.photons.pop();
        p.dispose();
      }
    },

    /**
     * Adds a photon beam as specified by the phetioID and state.
     * @param {SingleBulbPhotonBeam} singleBulbPhotonBeam
     * @param {Tandem} tandem
     * @param {Object} photonStateObject
     */
    addChildInstance: function( singleBulbPhotonBeam, tandem, photonStateObject ) {
      assert && assertInstanceOf( singleBulbPhotonBeam, phet.colorVision.SingleBulbPhotonBeam );

      // location, velocity, intensity, color, isWhite, wavelength, tandem
      var photonInstance = new phet.colorVision.SingleBulbPhoton(
        Vector2IO.fromStateObject( photonStateObject.location ),
        Vector2IO.fromStateObject( photonStateObject.velocity ),
        photonStateObject.intensity,
        ColorIO.fromStateObject( photonStateObject.color ),
        photonStateObject.isWhite,
        photonStateObject.wavelength,
        tandem
      );
      photonInstance.passedFilter = photonStateObject.passedFilter;
      singleBulbPhotonBeam.photons.push( photonInstance );
      singleBulbPhotonBeam.repaintEmitter.emit();
    },

    /**
     * Serializes an instance.
     * @returns {Object}
     */
    toStateObject: function() {
      return {};
    },

    /**
     * Deserializes an instance.
     * @returns {}
     */
    fromStateObject: function() {
      return {};
    },

    /**
     */
    setValue: function() {
    }
  } );

  colorVision.register( 'SingleBulbPhotonBeamIO', SingleBulbPhotonBeamIO );

  return SingleBulbPhotonBeamIO;
} );

