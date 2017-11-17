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
  var ObjectIO = require( 'ifphetio!PHET_IO/types/ObjectIO' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );
  var Vector2IO = require( 'DOT/Vector2IO' );

  /**
   * @param rgbPhoton
   * @param phetioID
   */
  var RGBPhotonIO = function( rgbPhoton, phetioID ) {
    assert && assertInstanceOf( rgbPhoton, phet.colorVision.RGBPhoton );
    ObjectIO.call( this, rgbPhoton, phetioID );
  };

  phetioInherit( ObjectIO, 'RGBPhotonIO', RGBPhotonIO, {}, {

    fromStateObject: function( stateObject ) {
      return new window.phet.colorVision.RGBPhoton(
        Vector2IO.fromStateObject( stateObject.location ),
        Vector2IO.fromStateObject( stateObject.velocity ),
        stateObject.intensity
      );
    },

    toStateObject: function( rgbPhoton ) {
      assert && assertInstanceOf( rgbPhoton, phet.colorVision.RGBPhoton );
      return {
        location: Vector2IO.toStateObject( rgbPhoton.location ),
        velocity: Vector2IO.toStateObject( rgbPhoton.velocity ),
        intensity: rgbPhoton.intensity
      };
    }
  } );

  colorVision.register( 'RGBPhotonIO', RGBPhotonIO );

  return RGBPhotonIO;
} );

