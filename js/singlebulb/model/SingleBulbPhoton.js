// Copyright 2014-2015, University of Colorado Boulder

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

    // the "wasWhite" attribute is needed to determine the intensity of a photon passing through the filter.
    // White photons passing through must be changed to match the filter color, but keep full intensity.
    // Colored photons must loose intensity when passing through the filter.
    // @public
    this.isWhite = this.wasWhite = isWhite;
    this.color = color;
    this.wavelength = wavelength;
    this.passedFilter = false;
  }

  // make this object globally accessible in support of together.js
  window.phet = window.phet || {};
  window.phet.colorVision = window.phet.colorVision || {};
  window.phet.colorVision.SingleBulbPhoton = SingleBulbPhoton;

  return inherit( RGBPhoton, SingleBulbPhoton, {
      toStateObject: function() {
        return _.extend( {
          isWhite: this.isWhite,
          color: this.color.toStateObject(),
          wavelength: this.wavelength
        }, RGBPhoton.prototype.toStateObject.call( this ) );
      }
    },
    // statics
    {
      fromStateObject: function( stateObject ) {
        return new SingleBulbPhoton( Vector2.fromStateObject( stateObject.location ), Vector2.fromStateObject( stateObject.velocity ),
          stateObject.intensity, Color.fromStateObject( stateObject.color ), stateObject.isWhite, stateObject.wavelength );
      }
    }
  );
} );
