// Copyright 2017, University of Colorado Boulder

/**
 * IO type for SingleBulbPhoton.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var ObjectIO = require( 'TANDEM/types/ObjectIO' );
  var RGBPhotonIO = require( 'COLOR_VISION/rgb/model/RGBPhotonIO' );
  var phetioInherit = require( 'TANDEM/phetioInherit' );

  // ifphetio
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertInstanceOf' );

  /**
   * @param {SingleBulbPhoton} singleBulbPhoton
   * @param {string} phetioID
   * @constructor
   */
  function SingleBulbPhotonIO( singleBulbPhoton, phetioID ) {
    assert && assertInstanceOf( singleBulbPhoton, phet.colorVision.SingleBulbPhoton );
    ObjectIO.call( this, singleBulbPhoton, phetioID );
  }

  phetioInherit( ObjectIO, 'SingleBulbPhotonIO', SingleBulbPhotonIO, {}, {
    documentation: 'A Photon from a single bulb.',

    /**
     * Serializes an instance.
     * @param {SingleBulbPhoton} singleBulbPhoton
     * @returns {Object}
     */
    toStateObject: function( singleBulbPhoton ) {
      assert && assertInstanceOf( singleBulbPhoton, phet.colorVision.SingleBulbPhoton );
      return _.extend( {
        isWhite: singleBulbPhoton.isWhite,
        color: singleBulbPhoton.color.toStateObject(),
        wavelength: singleBulbPhoton.wavelength,
        passedFilter: singleBulbPhoton.passedFilter
      }, RGBPhotonIO.toStateObject( singleBulbPhoton ) );
    },

    /**
     * Deserializes an instance. Not needed here since all children are created by the container.
     * @param {Object} stateObject
     * @returns {{}}
     */
    fromStateObject: function( stateObject ) {
      return {};
    }
  } );

  colorVision.register( 'SingleBulbPhotonIO', SingleBulbPhotonIO );

  return SingleBulbPhotonIO;
} )
;

