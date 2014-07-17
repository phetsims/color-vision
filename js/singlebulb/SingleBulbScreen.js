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
  var Constants = require( 'COLOR_VISION/ColorVisionConstants' );

  // strings
  var singleBulbString = require( 'string!COLOR_VISION/singlebulb' );

  /**
   * @constructor
   */
  function SingleBulbScreen() {
    Screen.call( this, singleBulbString, new SingleBulbIconNode( Constants.HOME_SCREEN_ICON_FILL ),
      function() { return new SingleBulbModel(); },
      function( model ) { return new SingleBulbScreenView( model ); },
      { backgroundColor: 'black', navigationBarIcon: new SingleBulbIconNode( 'black' ) }
    );
  }

  return inherit( Screen, SingleBulbScreen );
} );