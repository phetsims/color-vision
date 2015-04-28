// Copyright 2002-2014, University of Colorado Boulder

/**
 * The 'RGB' screen. Conforms to the contract specified in joist/Screen.
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
  var ColorVisionConstants = require( 'COLOR_VISION/ColorVisionConstants' );

  // strings
  var rgbString = require( 'string!COLOR_VISION/RgbBulbsModule.title' );

  /**
   * @param {Tandem} tandem - support for exporting instances from the sim
   * @constructor
   */
  function RGBScreen( tandem ) {
    Screen.call( this, rgbString, new RGBIconNode( ColorVisionConstants.HOME_SCREEN_ICON_OPTIONS ),
      function() { return new RGBModel(); },
      function( model ) { return new RGBScreenView( model ); },
      {
        backgroundColor: 'black',
        navigationBarIcon: new RGBIconNode( ColorVisionConstants.NAVBAR_ICON_OPTIONS ),
        homeScreenButtonTogetherID: 'homeScreen.rgbScreenButton',
        navigationBarScreenButtonTogetherID: 'navigationBar.rgbScreenButton'
      }
    );
  }

  return inherit( Screen, RGBScreen );
} );