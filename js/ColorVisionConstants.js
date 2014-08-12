// Copyright 2002-2014, University of Colorado Boulder

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
    HOME_SCREEN_ICON_OPTIONS: { fill: '#222222', stroke: 'rgb(220,220,200)', lineWidth: 5 },
    NAVBAR_ICON_OPTIONS: { fill: 'black', stroke: null, lineWidth: 0 }
  };
} );