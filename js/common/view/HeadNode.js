// Copyright 2014-2019, University of Colorado Boulder

/**
 * HeadNode for both screens.
 * This node has two layers of heads. The back layer is the full head image, and the front layer has the nose
 * cut out, and in between are the photon beams. This is because we want the photons to get cut off at a particular
 * place, and this was easiest to accomplish with layering, as opposed to shaping the end of the photon beams.
 * This is technically not necessary in single bulb mode because there is only one beam and it isn't at an angle, but
 * it still uses this node for consistency and simplicity, it just doesn't pass the beams to layer in.
 *
 * @author Aaron Davis
 */

import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import RadioButtonGroup from '../../../../sun/js/buttons/RadioButtonGroup.js';
import headFrontImage from '../../../images/head-front_png.js';
import silhouetteIcon from '../../../images/head-icon_png.js';
import headImage from '../../../images/head_png.js';
import silhouetteFrontImage from '../../../images/silhouette-front_png.js';
import headIcon from '../../../images/silhouette-icon_png.js';
import silhouetteImage from '../../../images/silhouette_png.js';
import colorVision from '../../colorVision.js';
import ColorVisionConstants from '../ColorVisionConstants.js';

// constants
const BOTTOM_OFFSET = 15;
const SCALE = 0.96;
const IMAGE_SCALE = 0.6;

/**
 * @param {Property.<string>} headModeProperty
 * @param {number} layoutBoundsBottom should be layoutBounds.bottom so the HeadNode can align relative to that
 * @param {Array.<RGBPhotonBeamNode>} photonBeams for layering properly, only used in RGBScreenView
 * @param {Tandem} tandem
 * @param {Object} [options]
 * @constructor
 */
function HeadNode( headModeProperty, layoutBoundsBottom, photonBeams, tandem, options ) {

  Node.call( this );

  const silhouetteOptions = { bottom: layoutBoundsBottom + BOTTOM_OFFSET, left: 78, scale: SCALE };
  const headOptions = { bottom: layoutBoundsBottom + BOTTOM_OFFSET, left: 75, scale: SCALE };

  // create nodes for each head image
  const silhouetteNode = new Image( silhouetteImage, silhouetteOptions );
  const headNode = new Image( headImage, headOptions );
  const silhouetteFrontNode = new Image( silhouetteFrontImage, silhouetteOptions );
  const headFrontNode = new Image( headFrontImage, headOptions );

  // Make sure only one image is visible at at time, depending on the user's selection
  headModeProperty.link( function( mode ) {
    silhouetteNode.visible = ( mode === 'brain' );
    headNode.visible = ( mode === 'no-brain' );
    silhouetteFrontNode.visible = ( mode === 'brain' );
    headFrontNode.visible = ( mode === 'no-brain' );
  } );

  // add full head images first so they show up in back
  this.addChild( silhouetteNode );
  this.addChild( headNode );

  // add the photon beams on top of the head images
  // this is only needed in the RGB screen. The single bulb screen takes care of its own layering to account for the filter
  if ( photonBeams ) {
    for ( let i = 0; i < photonBeams.length; i++ ) {
      this.addChild( photonBeams[ i ] );
    }
  }

  // add the front head image with the nose cut out so the photons get cut off at the right place (by going under these nodes)
  this.addChild( silhouetteFrontNode );
  this.addChild( headFrontNode );

  // Add head mode toggle
  const toggleButtonsContent = [ {
    value: 'no-brain',
    node: new Image( silhouetteIcon, { scale: IMAGE_SCALE } ),
    tandemName: 'hideBrainRadioButton'
  }, {
    value: 'brain',
    node: new Image( headIcon, { scale: IMAGE_SCALE } ),
    tandemName: 'showBrainRadioButton'
  } ];

  const radioButtonGroup = new RadioButtonGroup( headModeProperty, toggleButtonsContent, merge( {
    buttonContentXMargin: 4,
    buttonContentYMargin: 4,
    bottom: layoutBoundsBottom - 22,
    centerX: silhouetteNode.centerX - 42,
    tandem: tandem.createTandem( 'radioButtonGroup' )
  }, ColorVisionConstants.RADIO_BUTTON_OPTIONS ) );
  this.addChild( radioButtonGroup );
}

colorVision.register( 'HeadNode', HeadNode );

inherit( Node, HeadNode );
export default HeadNode;