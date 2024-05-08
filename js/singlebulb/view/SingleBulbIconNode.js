// Copyright 2014-2021, University of Colorado Boulder

/**
 * Icon for the 'Single Bulb' screen.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */

import Screen from '../../../../joist/js/Screen.js';
import { Rectangle } from '../../../../scenery/js/imports.js';
import colorVision from '../../colorVision.js';
import FlashlightAndBeamNode from '../../common/view/FlashlightAndBeamNode.js';

class SingleBulbIconNode extends Rectangle {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {
    super( 0, 0, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.width, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.height, options );
    this.addChild( new FlashlightAndBeamNode( 0, 'yellow', { centerX: this.centerX, centerY: this.centerY } ) );
  }
}

colorVision.register( 'SingleBulbIconNode', SingleBulbIconNode );

export default SingleBulbIconNode;