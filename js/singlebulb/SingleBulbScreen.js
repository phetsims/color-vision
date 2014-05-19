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
  var RGBModel = require( 'COLOR_VISION/rgb/model/RGBModel' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // strings
  var singleBulbString = require( 'string!COLOR_VISION/singlebulb' );

  function SingleBulbScreen() {
    Screen.call( this, singleBulbString, new Rectangle( 0, 0, 10, 10 ),
      function() { return new RGBModel(); },
      function( model ) { return new SingleBulbScreenView( model ); },
      { backgroundColor: 'black' }
    );
  }

  return inherit( Screen, SingleBulbScreen );
} );