// Copyright 2002-2014, University of Colorado Boulder

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
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var HeadToggleNode = require( 'COLOR_VISION/common/view/HeadToggleNode' );

  // images
  var headWithBrainImage = require( 'image!COLOR_VISION/head-with-brain.png' );
  var headNoBrainImage = require( 'image!COLOR_VISION/head-no-brain.png' );
  var headFrontWithBrainImage = require( 'image!COLOR_VISION/head-front-with-brain.png' );
  var headFrontNoBrainImage = require( 'image!COLOR_VISION/head-front-no-brain.png' );

  // contants
  var BOTTOM_OFFSET = 15;
  var SCALE = 0.7;

  /**
   * @param {Property<String>} headModeProperty
   * @param {Number} layoutBoundsBottom should be layoutBounds.bottom so the HeadNode can align relative to that
   * @param {Array<RGBPhotonBeamNode>} photonBeams for layering properly, only used in RGBScreenView
   * @constructor
   */
  function HeadNode( headModeProperty, layoutBoundsBottom, photonBeams ) {

    Node.call( this );

    var headWithBrainOptions = { bottom: layoutBoundsBottom + BOTTOM_OFFSET, left: 50, scale: SCALE };
    var headNoBrainOptions = { bottom: layoutBoundsBottom + BOTTOM_OFFSET, left: 75, scale: SCALE };

    // create nodes for each head image
    var headWithBrainNode = new Image( headWithBrainImage, headWithBrainOptions );
    var headNoBrainNode = new Image( headNoBrainImage, headNoBrainOptions );
    var headFrontWithBrainNode = new Image( headFrontWithBrainImage, headWithBrainOptions );
    var headFrontNoBrainNode = new Image( headFrontNoBrainImage, headNoBrainOptions );

    // Make sure only one image is visible at at time, depending on the user's selection
    headModeProperty.link( function( mode ) {
      headWithBrainNode.visible = ( mode === 'brain' );
      headNoBrainNode.visible = ( mode === 'no-brain' );
      headFrontWithBrainNode.visible = ( mode === 'brain' );
      headFrontNoBrainNode.visible = ( mode === 'no-brain' );
    } );

    // add full head images first so they show up in back
    this.addChild( headWithBrainNode );
    this.addChild( headNoBrainNode );

    // add the photon beams on top of the head images
    // this is only needed in the RGB screen. The single bulb screen takes care of its own layering to account for the filter
    if ( photonBeams ) {
      for ( var i = 0; i < photonBeams.length; i++ ) {
        this.addChild( photonBeams[i] );
      }
    }

    // add the front head image with the nose cut out so the photons get cut off at the right place (by going under these nodes)
    this.addChild( headFrontWithBrainNode );
    this.addChild( headFrontNoBrainNode );

    // Add head mode toggle
    this.addChild( new HeadToggleNode( headModeProperty, { bottom: layoutBoundsBottom - 22, centerX: headWithBrainNode.centerX - 40 } ) );
  }

  return inherit( Node, HeadNode );
} );
