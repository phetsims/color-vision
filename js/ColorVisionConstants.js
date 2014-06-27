// Copyright 2002-2013, University of Colorado Boulder

/**
 * Constants used throughout the simulation.
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  return {
    BEAM_HEIGHT: 130,
    CENTER_Y_OFFSET: -20,
    HOME_SCREEN_ICON_FILL: '#222222',
    X_VELOCITY: -240,   // x-velocity of photons, in screenview pixels / second
    FAN_FACTOR: 1.05,   // amount of fanning of photons

    // most platforms should be getting more than 20 fps,
    // if the platform is getting less than 20 fps due to slow hardware, then the photons will appear slower
    MAX_DT: 0.05
  };
} );