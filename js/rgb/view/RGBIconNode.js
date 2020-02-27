// Copyright 2014-2019, University of Colorado Boulder

/**
 * Icon for the 'RGB' screen.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */

import Screen from '../../../../joist/js/Screen.js';
import inherit from '../../../../phet-core/js/inherit.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import colorVision from '../../colorVision.js';
import FlashlightNode from '../../common/view/FlashlightNode.js';

/**
 * @param {Object} [options]
 * @constructor
 */
function RGBIconNode( options ) {

  Rectangle.call( this, 0, 0, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.width, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.height, options );

  const redFlashlight = new FlashlightNode( -Math.PI / 12, 'red' );
  const greenFlashlight = new FlashlightNode( 0, 'green' );
  const blueFlashlight = new FlashlightNode( Math.PI / 12, 'blue' );

  const flashlightVBox = new VBox(
    {
      children: [
        redFlashlight,
        greenFlashlight,
        blueFlashlight ],
      spacing: -4,
      centerX: this.centerX,
      centerY: this.centerY
    } );

  this.addChild( flashlightVBox );
}

colorVision.register( 'RGBIconNode', RGBIconNode );

inherit( Rectangle, RGBIconNode );
export default RGBIconNode;