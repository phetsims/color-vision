// Copyright 2002-2014, University of Colorado Boulder

/**
 * BulbWavelengthSlider
 *
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  var inherit = require( 'PHET_CORE/inherit' );
  var WavelengthSlider = require( 'SCENERY_PHET/WavelengthSlider' );
  var WavelengthSliderRect = require( 'COLOR_VISION/singlebulb/view/WavelengthSliderRect' );

  /**
   * @param {Number} width the width of the track
   * @param {Number} height the height of the track
   * @param {Property<Number>} flashlightWavelengthProperty
   * @param {Object} options
   * @constructor
   */
  function BulbWavelengthSlider( width, height, flashlightWavelengthProperty, options ) {
    WavelengthSliderRect.call( this, width, height, options );

    // Create upper WavelengthSlider node
    this.addChild( new WavelengthSlider( flashlightWavelengthProperty,
      {
        tweakersVisible: false,
        valueVisible: false,
        trackWidth: width,
        trackHeight: height,
        cursorStroke: 'white',
        thumbWidth: 30,
        thumbHeight: 40,
        thumbTouchAreaExpandY: 10,
        pointerAreasOverTrack: true
      } ) );
  }

  return inherit( WavelengthSliderRect, BulbWavelengthSlider );
} );
