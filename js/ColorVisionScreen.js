//  Copyright 2002-2014, University of Colorado Boulder

/**
 * The 'Color Vision' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var ColorVisionScreenView = require( 'COLOR_VISION/view/ColorVisionScreenView' );

  // strings
  var colorVisionString = require( 'string!COLOR_VISION/color-vision.name' );

  function ColorVisionScreen() {
    Screen.call( this, colorVisionString, null /* no icon, single-screen sim */,
      function() { return {}; },
      function( model ) { return new ColorVisionScreenView( model ); },
      { backgroundColor: 'black' }
    );
  }

  return inherit( Screen, ColorVisionScreen );
} );