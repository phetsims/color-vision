// Copyright 2002-2013, University of Colorado Boulder

/**
 * Constants used throughout the simulation.
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  var Color = require( 'SCENERY/util/Color' );

  return {
    BEAM_HEIGHT: 130,
    RED_BEAM_LENGTH: 300,
    GREEN_BEAM_LENGTH: 250,
    BLUE_BEAM_LENGTH: 330,
    SINGLE_BEAM_LENGTH: 280,
    FLASHLIGHT_ANGLE: Math.PI / 6,
    CENTER_Y_OFFSET: -20,
    HOME_SCREEN_ICON_FILL: '#222222',
    GAUSSIAN_WIDTH: 50, // in units of wavelengths
    X_VELOCITY: -240,  // x-velocity of photons
    FAN_FACTOR: 1.05,   // amount of fanning of photons
    PLAY_BUTTON_COLOR: new Color( 247, 151, 34 )
  };
} );