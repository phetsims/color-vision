// Copyright 2014, University of Colorado Boulder

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
                          // Note: The photons in color vision move at a constant x-velocity, not a constant speed.
                          // The y-velocity varies only slightly to accommodate the fanning of the photons,
                          // so it is not really discernible when looking at the simulation.
    FAN_FACTOR: 1.05,     // amount of fanning of photons
    SLIDER_BORDER_STROKE: '#c0b9b9', // gray
    HOME_SCREEN_ICON_OPTIONS: { fill: 'rgb(20,20,20)' },
    NAVBAR_ICON_OPTIONS: { fill: 'black' },

    // options common to the radio buttons in both SingleBulbScreenView and HeadNode
    RADIO_BUTTON_OPTIONS: {
      baseColor: 'black',
      selectedStroke: 'yellow',
      deselectedStroke: 'yellow',
      selectedLineWidth: 1.3,
      deselectedLineWidth: 0.6,
      orientation: 'horizontal',
      spacing: 13
    }
  };
} );