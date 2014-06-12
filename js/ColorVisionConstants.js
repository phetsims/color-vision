// Copyright 2002-2013, University of Colorado Boulder

/**
 * Constants used throughout the simulation.
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

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
    X_VELOCITY: -240,   // x-velocity of photons, in screenview pixels / second
    FAN_FACTOR: 1.05,   // amount of fanning of photons

    // most platforms should be getting more than 10 fps,
    // if the platform is getting less than 10 fps due to slow hardware, then the phtons will appear slower
    MAX_DT: 0.1
  };
} );