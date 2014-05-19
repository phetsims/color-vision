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
  var ColorVisionScreenView = require( 'COLOR_VISION/rgb/view/ColorVisionScreenView' );
  var ColorVisionModel = require( 'COLOR_VISION/rgb/model/ColorVisionModel' );

  // strings
  var rgbString = require( 'string!COLOR_VISION/rgb' );

  function ColorVisionScreen() {
    Screen.call( this, rgbString, null /* no icon, single-screen sim */,
      function() { return new ColorVisionModel(); },
      function( model ) { return new ColorVisionScreenView( model ); },
      { backgroundColor: 'black' }
    );
  }

  return inherit( Screen, ColorVisionScreen );
} );