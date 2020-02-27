// Copyright 2014-2019, University of Colorado Boulder

/**
 * The 'RGB' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Sam Reid
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import inherit from '../../../phet-core/js/inherit.js';
import colorVisionStrings from '../color-vision-strings.js';
import colorVision from '../colorVision.js';
import ColorVisionConstants from '../common/ColorVisionConstants.js';
import RGBModel from './model/RGBModel.js';
import RGBIconNode from './view/RGBIconNode.js';
import RGBScreenView from './view/RGBScreenView.js';

const rgbBulbsModuleTitleString = colorVisionStrings.RgbBulbsModule.title;

/**
 * @param {Tandem} tandem
 * @constructor
 */
function RGBScreen( tandem ) {

  const options = {
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

inherit( Screen, RGBScreen );
export default RGBScreen;