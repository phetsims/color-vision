// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model of a photon for single bulb screen.
 *
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RGBPhoton = require( 'COLOR_VISION/rgb/model/RGBPhoton' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Vector2} location
   * @param {Vector2} velocity
   * @param {Number} intensity between 0-1 for color alpha value
   * @param {Color} color
   * @param {boolean} isWhite
   * @param {Number} wavelength
   # @constructor
   */
  function SingleBulbPhoton( location, velocity, intensity, color, isWhite, wavelength ) {

    RGBPhoton.call( this, location, velocity, intensity );

    this.passedFilter = false;

    // the "wasWhite" attribute is needed to determine the intensity of a photon passing through the filter.
    // White photons passing through must be changed to match the filter color, but keep full intensity.
    // Colored photons must loose intensity when passing through the filter.
    this.isWhite = this.wasWhite = isWhite;
    this.color = color;
    this.wavelength = wavelength;
  }

  window.phet = window.phet || {};
  window.phet.colorVision = window.phet.colorVision || {};
  window.phet.colorVision.SingleBulbPhoton = SingleBulbPhoton;

  return inherit( RGBPhoton, SingleBulbPhoton, {
      toJSON: function() {
        return _.extend( {
          isWhite: this.isWhite,
          color: this.color.toJSON(),
          wavelength: this.wavelength
        }, RGBPhoton.prototype.toJSON.call( this ) );
      }
    },
    // statics
    {
      fromJSON: function( json ) {
        return new SingleBulbPhoton( Vector2.fromJSON( json.location ), Vector2.fromJSON( json.velocity ),
          json.intensity, Color.fromJSON( json.color ), json.isWhite, json.wavelength );
      }
    }
  );
} );
