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
  var SingleBulbScreenView = require( 'COLOR_VISION/singlebulb/view/SingleBulbScreenView' );
  var SingleBulbIconNode = require( 'COLOR_VISION/singlebulb/view/SingleBulbIconNode' );
  var RGBModel = require( 'COLOR_VISION/rgb/model/RGBModel' );

  // strings
  var singleBulbString = require( 'string!COLOR_VISION/singlebulb' );

  function SingleBulbScreen() {
    Screen.call( this, singleBulbString, new SingleBulbIconNode(),
      function() { return new RGBModel(); },
      function( model ) { return new SingleBulbScreenView( model ); },
      { backgroundColor: 'black' }
    );
  }

  return inherit( Screen, SingleBulbScreen );
} );