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
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // strings
  var rgbString = require( 'string!COLOR_VISION/rgb' );

  function RGBScreen() {
    Screen.call( this, rgbString, new Rectangle( 0, 0, 10, 10 ),
      function() { return new ColorVisionModel(); },
      function( model ) { return new ColorVisionScreenView( model ); },
      { backgroundColor: 'black' }
    );
  }

  return inherit( Screen, RGBScreen );
} );