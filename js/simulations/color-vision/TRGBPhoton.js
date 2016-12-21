// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'PHET_IO/assertions/assertInstanceOf' );
  var phetioNamespace = require( 'PHET_IO/phetioNamespace' );
  var phetioInherit = require( 'PHET_IO/phetioInherit' );
  var TObject = require( 'PHET_IO/types/TObject' );
  var TVector2 = require( 'PHET_IO/types/dot/TVector2' );

  var TRGBPhoton = function( instance, phetioID ) {
    assertInstanceOf( instance, phet.colorVision.RGBPhoton );
    TObject.call( this, instance, phetioID );
  };
  phetioInherit( TObject, 'TRGBPhoton', TRGBPhoton, {}, {

    fromStateObject: function( stateObject ) {
      return new window.phet.colorVision.RGBPhoton(
        TVector2.fromStateObject( stateObject.location ),
        TVector2.fromStateObject( stateObject.velocity ),
        stateObject.intensity
      );
    },

    toStateObject: function( value ) {
      return {
        location: TVector2.toStateObject( value.location ),
        velocity: TVector2.toStateObject( value.velocity ),
        intensity: value.intensity
      };
    },

    setValue: function( instance, value ) {}
  } );

  phetioNamespace.register( 'TRGBPhoton', TRGBPhoton );

  return TRGBPhoton;
} );

