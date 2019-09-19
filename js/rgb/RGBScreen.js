// Copyright 2014-2019, University of Colorado Boulder

/**
 * The 'RGB' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Sam Reid
 */
define( require => {
  'use strict';

  // modules
  const colorVision = require( 'COLOR_VISION/colorVision' );
  const ColorVisionConstants = require( 'COLOR_VISION/common/ColorVisionConstants' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Property = require( 'AXON/Property' );
  const RGBIconNode = require( 'COLOR_VISION/rgb/view/RGBIconNode' );
  const RGBModel = require( 'COLOR_VISION/rgb/model/RGBModel' );
  const RGBScreenView = require( 'COLOR_VISION/rgb/view/RGBScreenView' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const rgbBulbsModuleTitleString = require( 'string!COLOR_VISION/RgbBulbsModule.title' );

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
      showUnselectedHomeScreenIconFrame: true,
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
