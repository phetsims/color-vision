// Copyright 2014-2015, University of Colorado Boulder

/**
 * Constants used in the Single Bulb Screen.
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  // modules
  var colorVision = require( 'COLOR_VISION/colorVision' );

  var SingleBulbConstants = {
    SINGLE_BEAM_LENGTH: 280,
    GAUSSIAN_WIDTH: 70 // width of the gaussian for the filter slider in units of wavelengths
  };

  colorVision.register( 'SingleBulbConstants', SingleBulbConstants );

  return SingleBulbConstants;
} );