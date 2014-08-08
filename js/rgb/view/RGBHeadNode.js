// Copyright 2002-2014, University of Colorado Boulder

/**
 * Head image for the RGB Screen. The difference between this node and SingleBulbHeadNode is that this
 * this node has two layers. The back layer is the same as in SingleBulbHeadNode, the front layer has the nose
 * cut out, and in between are the photon beams. This is because we want the photons to get cut off at a particular
 * place, and this was easiest to accomplish with layering, as opposed to shaping the end of the photon beams.
 * This issue doesn't arise in single bulb mode because there is only one beam and it isn't at an angle, so it is easy
 * just to set it to the right length.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Image = require( 'SCENERY/nodes/Image' );
  var SingleBulbHeadNode = require( 'COLOR_VISION/singlebulb/view/SingleBulbHeadNode' );
  var HeadToggleNode = require( 'COLOR_VISION/common/view/HeadToggleNode' );

  // images
  var headFrontWithBrainImage = require( 'image!COLOR_VISION/head-front-with-brain.png' );
  var headFrontNoBrainImage = require( 'image!COLOR_VISION/head-front-no-brain.png' );

  /**
   * @param {Property<String>} headModeProperty
   * @param {Number} layoutBoundsBottom should be layoutBounds.bottom so the HeadNode can align relative to that
   * @param {Array<RGBPhotonBeamNode>} photonBeams
   * @constructor
   */
  function RGBHeadNode( headModeProperty, layoutBoundsBottom, photonBeams ) {
    assert && assert( photonBeams.length === 3 );

    // add full head images, as in the single bulb screen
    SingleBulbHeadNode.call( this, headModeProperty, layoutBoundsBottom );

    // add the photon beams on top of the head images
    for ( var i = 0; i < 3; i++ ) {
      this.addChild( photonBeams[i] );
    }

    // add the front head image with the nose cut out so the photons get cut off at the right place (by going under these nodes)
    var headFrontWithBrainNode = new Image( headFrontWithBrainImage, this.headWithBrainOptions );
    var headFrontNoBrainNode = new Image( headFrontNoBrainImage, this.headNoBrainOptions );

    // Make sure only one image is visible at at time, depending on the user's selection
    headModeProperty.link( function( mode ) {
      headFrontWithBrainNode.visible = ( mode === 'brain' );
      headFrontNoBrainNode.visible = ( mode === 'no-brain' );
    } );

    this.addChild( headFrontWithBrainNode );
    this.addChild( headFrontNoBrainNode );

    // Add head mode toggle
    this.addChild( new HeadToggleNode( headModeProperty, { bottom: layoutBoundsBottom - 22, centerX: headFrontWithBrainNode.centerX - 40 } ) );
  }

  return inherit( SingleBulbHeadNode, RGBHeadNode );
} );
