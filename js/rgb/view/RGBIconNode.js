// Copyright 2014-2024, University of Colorado Boulder

/**
 * Icon for the 'RGB' screen.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */

import Screen from '../../../../joist/js/Screen.js';
import { Rectangle, VBox } from '../../../../scenery/js/imports.js';
import colorVision from '../../colorVision.js';
import FlashlightAndBeamNode from '../../common/view/FlashlightAndBeamNode.js';

class RGBIconNode extends Rectangle {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    super( 0, 0, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.width, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.height, options );

    const redFlashlight = new FlashlightAndBeamNode( -Math.PI / 12, 'red' );
    const greenFlashlight = new FlashlightAndBeamNode( 0, 'green' );
    const blueFlashlight = new FlashlightAndBeamNode( Math.PI / 12, 'blue' );

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
}

colorVision.register( 'RGBIconNode', RGBIconNode );

export default RGBIconNode;