//  Copyright 2002-2014, University of Colorado Boulder

/**
 * The 'Single Bulb' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var SingleBulbScreenView = require( 'COLOR_VISION/singlebulb/view/SingleBulbScreenView' );
  var SingleBulbIconNode = require( 'COLOR_VISION/singlebulb/view/SingleBulbIconNode' );
  var SingleBulbModel = require( 'COLOR_VISION/singlebulb/model/SingleBulbModel' );
  var ColorVisionConstants = require( 'COLOR_VISION/ColorVisionConstants' );

  // strings
  var singleBulbString = require( 'string!COLOR_VISION/SingleBulbModule.title' );

  /**
   * @constructor
   */
  function SingleBulbScreen() {
    Screen.call( this, singleBulbString, new SingleBulbIconNode( ColorVisionConstants.HOME_SCREEN_ICON_OPTIONS ),
      function() { return new SingleBulbModel(); },
      function( model ) { return new SingleBulbScreenView( model ); },
      {
        backgroundColor: 'black',
        navigationBarIcon: new SingleBulbIconNode( ColorVisionConstants.NAVBAR_ICON_OPTIONS ),
        homeScreenButtonTogetherID: 'homeScreen.singleBulbScreenButton',
        navigationBarScreenButtonTogetherID: 'navigationBar.singleBulbScreenButton'
      }
    );
  }

  return inherit( Screen, SingleBulbScreen );
} );