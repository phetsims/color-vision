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
  var TRGBPhoton = require( 'PHET_IO/simulations/color-vision/TRGBPhoton' );

  var TSingleBulbPhoton = function( instance, phetioID ) {
    assertInstanceOf( instance, phet.colorVision.SingleBulbPhoton );
    TObject.call( this, instance, phetioID );
  };

  phetioInherit( TObject, 'TSingleBulbPhoton', TSingleBulbPhoton, {}, {

    toStateObject: function( instance ) {
      return _.extend( {
        isWhite: instance.isWhite,
        color: instance.color.toStateObject(),
        wavelength: instance.wavelength,
        passedFilter: instance.passedFilter
      }, TRGBPhoton.toStateObject( instance ) );
    },

    // Used to setValue. Not needed here since all children are created by the container.
    fromStateObject: function( stateObject ) {
      return {};
    }
  } );

  phetioNamespace.register( 'TSingleBulbPhoton', TSingleBulbPhoton );

  return TSingleBulbPhoton;
} )
;

