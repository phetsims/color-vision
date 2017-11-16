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
   * @param instance
   * @param phetioID
   */
  var RGBPhotonIO = function( instance, phetioID ) {
    assert && assertInstanceOf( instance, phet.colorVision.RGBPhoton );
    ObjectIO.call( this, instance, phetioID );
  };

  phetioInherit( ObjectIO, 'RGBPhotonIO', RGBPhotonIO, {}, {

    fromStateObject: function( stateObject ) {
      return new window.phet.colorVision.RGBPhoton(
        Vector2IO.fromStateObject( stateObject.location ),
        Vector2IO.fromStateObject( stateObject.velocity ),
        stateObject.intensity
      );
    },

    toStateObject: function( value ) {
      return {
        location: Vector2IO.toStateObject( value.location ),
        velocity: Vector2IO.toStateObject( value.velocity ),
        intensity: value.intensity
      };
    }
  } );

  colorVision.register( 'RGBPhotonIO', RGBPhotonIO );

  return RGBPhotonIO;
} );

