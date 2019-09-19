// Copyright 2014-2015, University of Colorado Boulder

/**
 * Constants used in the RGB Screen.
 * @author Aaron Davis
 */
define( require => {
  'use strict';

  // modules
  const colorVision = require( 'COLOR_VISION/colorVision' );

  const RGBConstants = {
    RED_BEAM_LENGTH: 300,
    GREEN_BEAM_LENGTH: 250,
    BLUE_BEAM_LENGTH: 330
  };

  colorVision.register( 'RGBConstants', RGBConstants );

  return RGBConstants;
} );