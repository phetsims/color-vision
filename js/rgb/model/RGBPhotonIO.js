// Copyright 2017-2019, University of Colorado Boulder

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
  var ObjectIO = require( 'TANDEM/types/ObjectIO' );
  var phetioInherit = require( 'TANDEM/phetioInherit' );
  var RGBPhoton = require( 'COLOR_VISION/rgb/model/RGBPhoton' );
  var Vector2IO = require( 'DOT/Vector2IO' );
  var validate = require( 'AXON/validate' );

  /**
   * @param {RGBPhoton} rgbPhoton
   * @param {string} phetioID
   */
  var RGBPhotonIO = function( rgbPhoton, phetioID ) {
    ObjectIO.call( this, rgbPhoton, phetioID );
  };

  phetioInherit( ObjectIO, 'RGBPhotonIO', RGBPhotonIO, {}, {
    validator: { valueType: RGBPhoton },

    /**
     * Serializes an instance.
     * @param {RGBPhoton} rgbPhoton
     * @returns {Object}
     */
    toStateObject: function( rgbPhoton ) {
      validate( rgbPhoton, this.validator );
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
      return new RGBPhoton(
        Vector2IO.fromStateObject( stateObject.location ),
        Vector2IO.fromStateObject( stateObject.velocity ),
        stateObject.intensity
      );
    }
  } );

  colorVision.register( 'RGBPhotonIO', RGBPhotonIO );

  return RGBPhotonIO;
} );

