// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var TVector2 = require( 'DOT/TVector2' );
  var TColor = require( 'SCENERY/util/TColor' );

  // phet-io modules
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertions/assertInstanceOf' );
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );
  var TObject = require( 'ifphetio!PHET_IO/types/TObject' );

  /**
   * @param instance
   * @param phetioID
   */
  var TSingleBulbPhotonBeam = function( instance, phetioID ) {
    assertInstanceOf( instance, phet.colorVision.SingleBulbPhotonBeam );
    TObject.call( this, instance, phetioID );
  };

  phetioInherit( TObject, 'TSingleBulbPhotonBeam', TSingleBulbPhotonBeam, {}, {
    documentation: 'The Beam on the single bulb screen.',

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

  colorVision.register( 'TSingleBulbPhotonBeam', TSingleBulbPhotonBeam );

  return TSingleBulbPhotonBeam;
} );

