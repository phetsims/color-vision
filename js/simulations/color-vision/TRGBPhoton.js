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

  var TRGBPhoton = function( instance, phetioID ) {
    assertInstanceOf( instance, phet.colorVision.RGBPhoton );
    TObject.call( this, instance, phetioID );
  };
  phetioInherit( TObject, 'TRGBPhoton', TRGBPhoton, {}, {

    fromStateObject: function( stateObject ) {
      return window.phet.colorVision.RGBPhoton.fromStateObject( stateObject );
    },

    toStateObject: function( value ) {
      return value.toStateObject();
    },

    setValue: function() {}
  } );

  phetioNamespace.register( 'TRGBPhoton', TRGBPhoton );

  return TRGBPhoton;
} );

