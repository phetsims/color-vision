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
      instance.photons.length = 0;
    },

    /**
     * Adds a precipitate particle as specified by the phetioID and state.
     * @param {Object} beam
     * @param {Tandem} tandem
     * @param {Object} photon
     */
    addChildInstance: function( beam, tandem, photon ) {
      // var photon = TSingleBulbPhoton.fromStateObject( photon );

      // location, velocity, intensity, color, isWhite, wavelength, tandem
      beam.photons.push( new phet.colorVision.SingleBulbPhoton(
        TVector2.fromStateObject( photon.location ),
        TVector2.fromStateObject( photon.velocity ),
        photon.intensity,
        TColor.fromStateObject( photon.color ),
        photon.isWhite,
        photon.wavelength,
        tandem
      ) );
      beam.repaintEmitter.emit();
    }

    // fromStateObject: function( stateObject ) {
    //   return window.phet.colorVision.SingleBulbPhoton.fromStateObject( stateObject );
    // },
    //
    // toStateObject: function( value ) {
    //   return value.toStateObject();
    // },

    // setValue: function( instance, value ) {}
  } );

  phetioNamespace.register( 'TSingleBulbPhotonBeam', TSingleBulbPhotonBeam );

  return TSingleBulbPhotonBeam;
} );

