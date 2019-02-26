// Copyright 2017-2018, University of Colorado Boulder

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
  var phetioInherit = require( 'TANDEM/phetioInherit' );
  var RGBPhotonIO = require( 'COLOR_VISION/rgb/model/RGBPhotonIO' );
  var validate = require( 'AXON/validate' );

  /**
   * @param {SingleBulbPhoton} singleBulbPhoton
   * @param {string} phetioID
   * @constructor
   */
  function SingleBulbPhotonIO( singleBulbPhoton, phetioID ) {
    ObjectIO.call( this, singleBulbPhoton, phetioID );
  }

  phetioInherit( ObjectIO, 'SingleBulbPhotonIO', SingleBulbPhotonIO, {}, {
    documentation: 'A Photon from a single bulb.',
    validator: { isValidValue: v => v instanceof phet.colorVision.SingleBulbPhoton },

    /**
     * Serializes an instance.
     * @param {SingleBulbPhoton} singleBulbPhoton
     * @returns {Object}
     */
    toStateObject: function( singleBulbPhoton ) {
      validate( singleBulbPhoton, this.validator );
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

