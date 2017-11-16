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
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );
  var ObjectIO = require( 'ifphetio!PHET_IO/types/ObjectIO' );
  var TRGBPhoton = require( 'COLOR_VISION/rgb/model/TRGBPhoton' );

  /**
   * @param instance
   * @param phetioID
   * @constructor
   */
  function SingleBulbPhotonIO( instance, phetioID ) {
    assert && assertInstanceOf( instance, phet.colorVision.SingleBulbPhoton );
    ObjectIO.call( this, instance, phetioID );
  }

  phetioInherit( ObjectIO, 'SingleBulbPhotonIO', SingleBulbPhotonIO, {}, {
    documentation: 'A Photon from a single bulb.',

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

  colorVision.register( 'SingleBulbPhotonIO', SingleBulbPhotonIO );

  return SingleBulbPhotonIO;
} )
;

