// Copyright 2002-2014, University of Colorado Boulder

/**
 * Head image for the Single Bulb Screen
 *
 * @author Aaron Davis (PhET Interactive Simulations)
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

  // contants
  var BOTTOM_OFFSET = 15;
  var SCALE = 0.7;

  /**
   * @param {Property<String>} headModeProperty
   * @param {Number} layoutBoundsBottom should be layoutBounds.bottom so the HeadNode can align relative to that
   * @constructor
   */
  function SingleBulbHeadNode( headModeProperty, layoutBoundsBottom ) {

    Node.call( this );

    this.headWithBrainOptions = { bottom: layoutBoundsBottom + BOTTOM_OFFSET, left: 50, scale: SCALE };
    this.headNoBrainOptions = { bottom: layoutBoundsBottom + BOTTOM_OFFSET, left: 75, scale: SCALE };

    var headWithBrainNode = new Image( headWithBrainImage, this.headWithBrainOptions );
    var headNoBrainNode = new Image( headNoBrainImage, this.headNoBrainOptions );

    // Make sure only one image is visible at at time, depending on the user's selection
    headModeProperty.link( function( mode ) {
      headWithBrainNode.visible = ( mode === 'brain' );
      headNoBrainNode.visible = ( mode === 'no-brain' );
    } );

    this.addChild( headWithBrainNode );
    this.addChild( headNoBrainNode );

    // Add head mode toggle
    // This ends up getting added twice in the case of RGBHeadNode because it inherits from this and adds layers on top
    this.addChild( new HeadToggleNode( headModeProperty, { bottom: layoutBoundsBottom - 22, centerX: headWithBrainNode.centerX - 40 } ) );
  }

  return inherit( Node, SingleBulbHeadNode );
} );
