//  Copyright 2002-2014, University of Colorado Boulder

/**
 * The 'Color Vision' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var RGBScreenView = require( 'COLOR_VISION/rgb/view/RGBScreenView' );
  var RGBIconNode = require( 'COLOR_VISION/rgb/view/RGBIconNode' );
  var RGBModel = require( 'COLOR_VISION/rgb/model/RGBModel' );
  var Constants = require( 'COLOR_VISION/ColorVisionConstants' );

  // strings
  var rgbString = require( 'string!COLOR_VISION/rgb' );

  /**
   * @constructor
   */
  function RGBScreen() {
    Screen.call( this, rgbString, new RGBIconNode( Constants.HOME_SCREEN_ICON_FILL ),
      function() { return new RGBModel(); },
      function( model ) { return new RGBScreenView( model ); },
      { backgroundColor: 'black', navigationBarIcon: new RGBIconNode( 'black' ) }
    );
  }

  return inherit( Screen, RGBScreen, {},
    {

    } );
} );