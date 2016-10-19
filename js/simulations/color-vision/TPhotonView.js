// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOfTypes = require( 'PHET_IO/assertions/assertInstanceOfTypes' );
  var phetioNamespace = require( 'PHET_IO/phetioNamespace' );
  var phetioInherit = require( 'PHET_IO/phetioInherit' );
  var TObject = require( 'PHET_IO/types/TObject' );

  var TPhotonView = function( instance, phetioID ) {
    assertInstanceOfTypes( instance, [
      phet.colorVision.SingleBulbPhotonBeamNode,
      phet.colorVision.RGBPhotonBeamNode
    ] );
    TObject.call( this, instance, phetioID );
  };

  phetioInherit( TObject, 'TPhotonView', TPhotonView, {
    setValue: {
      implementation: function() {
        this.instance.invalidatePaint();
      }
    }
  }, {

    fromStateObject: function( stateObject ) {
      return {
        // not needed, at least not yet
      };
    },

    toStateObject: function( value ) {
      return {
        // not needed, at least not yet
      };
    }
  } );

  phetioNamespace.register( 'TPhotonView', TPhotonView );

  return TPhotonView;
} );

