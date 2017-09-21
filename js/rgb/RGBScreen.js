// Copyright 2014-2017, University of Colorado Boulder

/**
 * The 'RGB' screen. Conforms to the contract specified in joist/Screen.
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
  var RGBIconNode = require( 'COLOR_VISION/rgb/view/RGBIconNode' );
  var RGBModel = require( 'COLOR_VISION/rgb/model/RGBModel' );
  var RGBScreenView = require( 'COLOR_VISION/rgb/view/RGBScreenView' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var rgbBulbsModuleTitleString = require( 'string!COLOR_VISION/RgbBulbsModule.title' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function RGBScreen( tandem ) {

    var options = {
      name: rgbBulbsModuleTitleString,
      backgroundColorProperty: new Property( 'black' ),
      homeScreenIcon: new RGBIconNode( ColorVisionConstants.HOME_SCREEN_ICON_OPTIONS ),
      navigationBarIcon: new RGBIconNode( ColorVisionConstants.NAVBAR_ICON_OPTIONS ),
      tandem: tandem
    };

    Screen.call( this,
      function() { return new RGBModel( tandem.createTandem( 'model' ) ); },
      function( model ) { return new RGBScreenView( model, tandem.createTandem( 'view' ) ); },
      options );
  }

  colorVision.register( 'RGBScreen', RGBScreen );

  return inherit( Screen, RGBScreen );
} );
