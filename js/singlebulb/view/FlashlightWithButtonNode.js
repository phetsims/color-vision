// Copyright 2014-2020, University of Colorado Boulder

/**
 * FlashlightWithButtonNode - for Single Bulb Screen flashlight
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import BooleanRoundStickyToggleButton from '../../../../sun/js/buttons/BooleanRoundStickyToggleButton.js';
import flashlightImage from '../../../images/flashlight-0-deg_png.js';
import colorVision from '../../colorVision.js';

/**
 * @param {Property.<boolean>} onProperty
 * @param {Tandem} tandem
 * @param {Object} [options]
 * @constructor
 */
function FlashlightWithButtonNode( onProperty, tandem, options ) {

  Node.call( this );

  const flashlightNode = new Image( flashlightImage, { scale: 0.85 } );

  const button = new BooleanRoundStickyToggleButton( onProperty, {
    centerY: flashlightNode.centerY,
    centerX: flashlightNode.centerX + 15,
    baseColor: 'red',
    radius: 15,
    tandem: tandem.createTandem( 'button' )
  } );

  this.addChild( flashlightNode );
  this.addChild( button );
  this.mutate( options );
}

colorVision.register( 'FlashlightWithButtonNode', FlashlightWithButtonNode );

inherit( Node, FlashlightWithButtonNode );
export default FlashlightWithButtonNode;