// Copyright 2018, University of Colorado Boulder

/**
 * Displays the color perceived by the viewer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ThoughtBubble = require( 'COLOR_VISION/common/view/ThoughtBubble' );

  // constants
  // used for moving the thought bubbles together as a group in case minor adjustments are needed
  var THOUGHT_BUBBLE_X = -15;
  var THOUGHT_BUBBLE_Y = -10;

  /**
   * @param {Property.<Color|string>} perceivedColorProperty
   * @param {Object} [options]
   * @constructor
   */
  function PerceivedColorNode( perceivedColorProperty, options ) {

    options = options || {};

    // add bubbles, from largest to smallest
    assert && assert( !options.children, 'PerceivedColorNode sets children' );
    options.children = [
      new ThoughtBubble( perceivedColorProperty, 45, {
        centerX: 220 + THOUGHT_BUBBLE_X,
        centerY: 60 + THOUGHT_BUBBLE_Y
      } ),
      new ThoughtBubble( perceivedColorProperty, 15, {
        centerX: 90 + THOUGHT_BUBBLE_X,
        centerY: 105 + THOUGHT_BUBBLE_Y
      } ),
      new ThoughtBubble( perceivedColorProperty, 12, {
        centerX: 62 + THOUGHT_BUBBLE_X,
        centerY: 165 + THOUGHT_BUBBLE_Y
      } ),
      new ThoughtBubble( perceivedColorProperty, 7, {
        centerX: 50 + THOUGHT_BUBBLE_X,
        centerY: 220 + THOUGHT_BUBBLE_Y
      } )
    ];

    Node.call( this, options );
  }

  colorVision.register( 'PerceivedColorNode', PerceivedColorNode );

  return inherit( Node, PerceivedColorNode );
} );
 