// Copyright 2014-2020, University of Colorado Boulder

/**
 * The 'Single Bulb' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Sam Reid
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import inherit from '../../../phet-core/js/inherit.js';
import colorVisionStrings from '../colorVisionStrings.js';
import colorVision from '../colorVision.js';
import ColorVisionConstants from '../common/ColorVisionConstants.js';
import SingleBulbModel from './model/SingleBulbModel.js';
import SingleBulbIconNode from './view/SingleBulbIconNode.js';
import SingleBulbScreenView from './view/SingleBulbScreenView.js';

const singleBulbModuleTitleString = colorVisionStrings.SingleBulbModule.title;

/**
 * @param {Tandem} tandem
 * @constructor
 */
function SingleBulbScreen( tandem ) {

  const options = {
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

inherit( Screen, SingleBulbScreen );
export default SingleBulbScreen;