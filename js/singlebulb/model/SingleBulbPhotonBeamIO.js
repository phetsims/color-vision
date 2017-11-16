// Copyright 2017, University of Colorado Boulder

/**
 *
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
   * @param instance
   * @param phetioID
   * @constructor
   */
  function SingleBulbPhotonBeamIO( instance, phetioID ) {
    assert && assertInstanceOf( instance, phet.colorVision.SingleBulbPhotonBeam );
    ObjectIO.call( this, instance, phetioID );
  }

  phetioInherit( ObjectIO, 'SingleBulbPhotonBeamIO', SingleBulbPhotonBeamIO, {}, {
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
        Vector2IO.fromStateObject( photonStateObject.location ),
        Vector2IO.fromStateObject( photonStateObject.velocity ),
        photonStateObject.intensity,
        ColorIO.fromStateObject( photonStateObject.color ),
        photonStateObject.isWhite,
        photonStateObject.wavelength,
        tandem
      );
      photonInstance.passedFilter = photonStateObject.passedFilter;
      beam.photons.push( photonInstance );
      beam.repaintEmitter.emit();
    }
  } );

  colorVision.register( 'SingleBulbPhotonBeamIO', SingleBulbPhotonBeamIO );

  return SingleBulbPhotonBeamIO;
} );

