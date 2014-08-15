// Copyright 2002-2014, University of Colorado Boulder

/**
 * WavelengthSliderRect the outline for wavelength sliders in the single bulb screen
 *
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );

  /**
   * @param {Number} width the width of the track
   * @param {Number} height the height of the track
   * @param {Object} options
   * @constructor
   */
  function WavelengthSliderRect( width, height, options ) {

    var borderRectSize = 10;

    options = _.extend( {
      fill: new LinearGradient( 0, 0, 0, height + borderRectSize ).addColorStop( 0, 'white' ).addColorStop( 1, 'black' ),
      stroke: '#c0b9b9' // gray
    }, options );

    Rectangle.call( this, -borderRectSize / 2, -borderRectSize / 2, width + borderRectSize, height + borderRectSize, 5, 5, options );
  }

  return inherit( Rectangle, WavelengthSliderRect );
} );
