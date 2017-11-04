// Copyright 2017, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertInstanceOf' );
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );
  var TObject = require( 'ifphetio!PHET_IO/types/TObject' );
  var TVector2 = require( 'DOT/TVector2' );

  /**
   * @param instance
   * @param phetioID
   */
  var TRGBPhoton = function( instance, phetioID ) {
    assert && assertInstanceOf( instance, phet.colorVision.RGBPhoton );
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
    }
  } );

  colorVision.register( 'TRGBPhoton', TRGBPhoton );

  return TRGBPhoton;
} );

