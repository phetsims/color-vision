// Copyright 2014-2017, University of Colorado Boulder

/**
 * The 'Single Bulb' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var ColorVisionConstants = require( 'COLOR_VISION/common/ColorVisionConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var Screen = require( 'JOIST/Screen' );
  var SingleBulbIconNode = require( 'COLOR_VISION/singlebulb/view/SingleBulbIconNode' );
  var SingleBulbModel = require( 'COLOR_VISION/singlebulb/model/SingleBulbModel' );
  var SingleBulbScreenView = require( 'COLOR_VISION/singlebulb/view/SingleBulbScreenView' );

  // strings
  var singleBulbModuleTitleString = require( 'string!COLOR_VISION/SingleBulbModule.title' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function SingleBulbScreen( tandem ) {

    var options = {
      name: singleBulbModuleTitleString,
      backgroundColorProperty: new Property( 'black' ),
      homeScreenIcon: new SingleBulbIconNode( ColorVisionConstants.HOME_SCREEN_ICON_OPTIONS ),
      navigationBarIcon: new SingleBulbIconNode( ColorVisionConstants.NAVBAR_ICON_OPTIONS ),
      tandem: tandem
    };

    Screen.call( this,
      function() { return new SingleBulbModel( tandem.createTandem( 'model' ) ); },
      function( model ) { return new SingleBulbScreenView( model, tandem.createTandem( 'view' ) ); },
      options );
  }

  colorVision.register( 'SingleBulbScreen', SingleBulbScreen );

  return inherit( Screen, SingleBulbScreen );
} );
