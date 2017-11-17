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
  var RGBPhotonIO = require( 'COLOR_VISION/rgb/model/RGBPhotonIO' );

  /**
   * @param singleBulbPhoton
   * @param phetioID
   * @constructor
   */
  function SingleBulbPhotonIO( singleBulbPhoton, phetioID ) {
    assert && assertInstanceOf( singleBulbPhoton, phet.colorVision.SingleBulbPhoton );
    ObjectIO.call( this, singleBulbPhoton, phetioID );
  }

  phetioInherit( ObjectIO, 'SingleBulbPhotonIO', SingleBulbPhotonIO, {}, {
    documentation: 'A Photon from a single bulb.',

    toStateObject: function( singleBulbPhoton ) {
      assert && assertInstanceOf( singleBulbPhoton, phet.colorVision.SingleBulbPhoton );
      return _.extend( {
        isWhite: singleBulbPhoton.isWhite,
        color: singleBulbPhoton.color.toStateObject(),
        wavelength: singleBulbPhoton.wavelength,
        passedFilter: singleBulbPhoton.passedFilter
      }, RGBPhotonIO.toStateObject( singleBulbPhoton ) );
    },

    // Used to setValue. Not needed here since all children are created by the container.
    fromStateObject: function( stateObject ) {
      return {};
    }
  } );

  colorVision.register( 'SingleBulbPhotonIO', SingleBulbPhotonIO );

  return SingleBulbPhotonIO;
} )
;

