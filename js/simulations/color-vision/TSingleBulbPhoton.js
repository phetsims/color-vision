// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'PHET_IO/assertions/assertInstanceOf' );
  var phetioNamespace = require( 'PHET_IO/phetioNamespace' );
  var phetioInherit = require( 'PHET_IO/phetioInherit' );
  var TObject = require( 'PHET_IO/types/TObject' );

  var TSingleBulbPhoton = phetioInherit( TObject, 'TSingleBulbPhoton', function( instance, phetioID ) {
    assertInstanceOf( instance, phet.colorVision.SingleBulbPhoton );
    TObject.call( this, instance, phetioID );
  }, {}, {

    fromStateObject: function( stateObject ) {
      return window.phet.colorVision.SingleBulbPhoton.fromStateObject( stateObject );
    },

    toStateObject: function( value ) {
      return value.toStateObject();
    },

    setValue: function() {}
  } );

  phetioNamespace.register( 'TSingleBulbPhoton', TSingleBulbPhoton );

  return TSingleBulbPhoton;
} );

