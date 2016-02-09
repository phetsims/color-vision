// Copyright 2014-2015, University of Colorado Boulder

/**
 * The 'Single Bulb' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var SingleBulbScreenView = require( 'COLOR_VISION/singlebulb/view/SingleBulbScreenView' );
  var SingleBulbIconNode = require( 'COLOR_VISION/singlebulb/view/SingleBulbIconNode' );
  var SingleBulbModel = require( 'COLOR_VISION/singlebulb/model/SingleBulbModel' );
  var ColorVisionConstants = require( 'COLOR_VISION/common/ColorVisionConstants' );

  // strings
  var singleBulbModuleTitleString = require( 'string!COLOR_VISION/SingleBulbModule.title' );

  /**
   * @constructor
   * @param {Tandem} tandem
   */
  function SingleBulbScreen( tandem ) {
    Screen.call( this, singleBulbModuleTitleString, new SingleBulbIconNode( ColorVisionConstants.HOME_SCREEN_ICON_OPTIONS ),
      function() { return new SingleBulbModel( tandem.createTandem( 'model' ) ); },
      function( model ) { return new SingleBulbScreenView( model, tandem.createTandem( 'view' ) ); }, {
        backgroundColor: 'black',
        navigationBarIcon: new SingleBulbIconNode( ColorVisionConstants.NAVBAR_ICON_OPTIONS ),
        tandem: tandem
      }
    );
  }

  colorVision.register( 'SingleBulbScreen', SingleBulbScreen );

  return inherit( Screen, SingleBulbScreen );
} );