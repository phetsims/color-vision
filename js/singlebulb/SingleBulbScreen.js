// Copyright 2014-2019, University of Colorado Boulder

/**
 * The 'Single Bulb' screen. Conforms to the contract specified in joist/Screen.
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
  const Screen = require( 'JOIST/Screen' );
  const SingleBulbIconNode = require( 'COLOR_VISION/singlebulb/view/SingleBulbIconNode' );
  const SingleBulbModel = require( 'COLOR_VISION/singlebulb/model/SingleBulbModel' );
  const SingleBulbScreenView = require( 'COLOR_VISION/singlebulb/view/SingleBulbScreenView' );

  // strings
  const singleBulbModuleTitleString = require( 'string!COLOR_VISION/SingleBulbModule.title' );

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
      showUnselectedHomeScreenIconFrame: true,
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
