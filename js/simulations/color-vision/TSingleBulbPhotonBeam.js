// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'PHET_IO/assertions/assertInstanceOf' );
  var phetioNamespace = require( 'PHET_IO/phetioNamespace' );
  var phetioInherit = require( 'PHET_IO/phetioInherit' );
  var TObject = require( 'PHET_IO/types/TObject' );
  var TVector2 = require( 'PHET_IO/types/dot/TVector2' );
  var TColor = require( 'PHET_IO/types/scenery/util/TColor' );

  var TSingleBulbPhotonBeam = function( instance, phetioID ) {
    assertInstanceOf( instance, phet.colorVision.SingleBulbPhotonBeam );
    TObject.call( this, instance, phetioID );
  };

  phetioInherit( TObject, 'TSingleBulbPhotonBeam', TSingleBulbPhotonBeam, {}, {

    clearChildInstances: function( instance ) {
      while ( instance.photons.length > 0 ) {
        var p = instance.photons.pop();
        p.dispose();
      }
    },

    /**
     * Adds a precipitate particle as specified by the phetioID and state.
     * @param {Object} beam
     * @param {Tandem} tandem
     * @param {Object} photonStateObject
     */
    addChildInstance: function( beam, tandem, photonStateObject ) {

      // location, velocity, intensity, color, isWhite, wavelength, tandem
      var photonInstance = new phet.colorVision.SingleBulbPhoton(
        TVector2.fromStateObject( photonStateObject.location ),
        TVector2.fromStateObject( photonStateObject.velocity ),
        photonStateObject.intensity,
        TColor.fromStateObject( photonStateObject.color ),
        photonStateObject.isWhite,
        photonStateObject.wavelength,
        tandem
      );
      photonInstance.passedFilter = photonStateObject.passedFilter;
      beam.photons.push( photonInstance );
      beam.repaintEmitter.emit();
    }
  } );

  phetioNamespace.register( 'TSingleBulbPhotonBeam', TSingleBulbPhotonBeam );

  return TSingleBulbPhotonBeam;
} );

