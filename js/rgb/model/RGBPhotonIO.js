// Copyright 2017, University of Colorado Boulder

/**
 * IO type for RGBPhoton.
 * 
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var Vector2IO = require( 'DOT/Vector2IO' );

  // ifphetio
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertInstanceOf' );
  var ObjectIO = require( 'ifphetio!PHET_IO/types/ObjectIO' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );

  /**
   * @param {RGBPhoton} rgbPhoton
   * @param {string} phetioID
   */
  var RGBPhotonIO = function( rgbPhoton, phetioID ) {
    assert && assertInstanceOf( rgbPhoton, phet.colorVision.RGBPhoton );
    ObjectIO.call( this, rgbPhoton, phetioID );
  };

  phetioInherit( ObjectIO, 'RGBPhotonIO', RGBPhotonIO, {}, {

    /**
     * Serializes an instance.
     * @param {RGBPhoton} rgbPhoton
     * @returns {Object}
     */
    toStateObject: function( rgbPhoton ) {
      assert && assertInstanceOf( rgbPhoton, phet.colorVision.RGBPhoton );
      return {
        location: Vector2IO.toStateObject( rgbPhoton.location ),
        velocity: Vector2IO.toStateObject( rgbPhoton.velocity ),
        intensity: rgbPhoton.intensity
      };
    },

    /**
     * Deserializes an instance.
     * @param {Object} stateObject
     * @returns {RGBPhoton}
     */
    fromStateObject: function( stateObject ) {
      return new phet.colorVision.RGBPhoton(
        Vector2IO.fromStateObject( stateObject.location ),
        Vector2IO.fromStateObject( stateObject.velocity ),
        stateObject.intensity
      );
    }
  } );

  colorVision.register( 'RGBPhotonIO', RGBPhotonIO );

  return RGBPhotonIO;
} );

