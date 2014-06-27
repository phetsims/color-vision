// Copyright 2002-2013, University of Colorado Boulder

/**
 * Constants used throughout the simulation.
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  return {
    BEAM_HEIGHT: 130,     // height of all photonBeamNodes from both screens
    CENTER_Y_OFFSET: -20, // many nodes are positioned with this offset from layoutBounds.centerY
    X_VELOCITY: -240,     // x-velocity of photons, in screenview pixels / second
    FAN_FACTOR: 1.05,     // amount of fanning of photons
    HOME_SCREEN_ICON_FILL: '#222222',

    // limit the max dt to be 0.05 to avoid gaps in the photon stream when a longer dt comes along.
    // most platforms should be getting more than 20 fps,
    // if the platform is getting less than 20 fps due to slow hardware, then the photons will appear slower
    MAX_DT: 0.05
  };
} );