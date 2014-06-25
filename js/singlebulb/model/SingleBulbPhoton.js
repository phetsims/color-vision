// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model of a photon for single bulb screen.
 *
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var RGBPhoton = require( 'COLOR_VISION/rgb/model/RGBPhoton' );

  /**
   * @param {Vector2} location
   * @param {Vector2} velocity
   * @param {Number} intensity between 0-1 for color alpha value
   * @param {Color} color
   * @param {boolean} isWhite
   # @constructor
   */
  function SingleBulbPhoton( location, velocity, intensity, color, isWhite ) {

    RGBPhoton.call( this, location, velocity, intensity );

    this.passedFilter = false;

    // the "wasWhite" attribute is needed to determine the intensity of a photon passing through the filter.
    // White photons passing through must be changed to match the filter color, but keep full intensity.
    // Colored photons must loose intensity when passing through the filter.
    this.isWhite = this.wasWhite = isWhite;
    this.color = color;
  }

  return inherit( RGBPhoton, SingleBulbPhoton );
} );
