// Copyright 2014-2019, University of Colorado Boulder

/**
 * Icon for the 'Single Bulb' screen.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */

import Screen from '../../../../joist/js/Screen.js';
import inherit from '../../../../phet-core/js/inherit.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import colorVision from '../../colorVision.js';
import FlashlightNode from '../../common/view/FlashlightNode.js';

/**
 * @param {Object} [options]
 * @constructor
 */
function SingleBulbIconNode( options ) {
  Rectangle.call( this, 0, 0, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.width, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.height, options );
  this.addChild( new FlashlightNode( 0, 'yellow', { centerX: this.centerX, centerY: this.centerY } ) );
}

colorVision.register( 'SingleBulbIconNode', SingleBulbIconNode );

inherit( Rectangle, SingleBulbIconNode );
export default SingleBulbIconNode;