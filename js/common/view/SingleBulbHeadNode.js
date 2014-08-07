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

  // images
  var headWithBrainImage = require( 'image!COLOR_VISION/head-with-brain.png' );
  var headNoBrainImage = require( 'image!COLOR_VISION/head-no-brain.png' );

  /**
   * @param {Property<String>} headModeProperty
   * @param {Number} layoutBoundsBottom should be layoutBounds.bottom so the HeadNode can align relative to that
   * @constructor
   */
  function SingleBulbHeadNode( headModeProperty, layoutBoundsBottom ) {

    Node.call( this );

    var headOptions = { bottom: layoutBoundsBottom + 15, left: 50, scale: 0.7 };

    var headWithBrainNode = new Image( headWithBrainImage, headOptions );
    var headNoBrainNode = new Image( headNoBrainImage, headOptions );

    // Make sure only one image is visible at at time, depending on the user's selection
    headModeProperty.link( function( mode ) {
      headWithBrainNode.visible = ( mode === 'brain' );
      headNoBrainNode.visible = ( mode === 'no-brain' );
    } );

    this.addChild( headWithBrainNode );
    this.addChild( headNoBrainNode );
  }

  return inherit( Node, SingleBulbHeadNode );
} );
