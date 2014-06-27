// Copyright 2002-2013, University of Colorado Boulder

/**
 * A group of 4 thought bubbles. Factored out here because it is used in both screens
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ThoughtBubble = require( 'COLOR_VISION/common/view/ThoughtBubble' );
  var Node = require( 'SCENERY/nodes/Node' );

  // constants
  // used for moving the thought bubbles together as a group in case minor adjustments are needed
  var THOUGHT_BUBBLE_X = -15;
  var THOUGHT_BUBBLE_Y = -10;

  /**
   * @param {PropertySet} model the model being used, either RGBModel or SingleBulbModel
   * @constructor
   */
  function ThoughtBubblesNode( model ) {
    Node.call( this );
    this.addChild( new ThoughtBubble( model, 45, { centerX: 220 + THOUGHT_BUBBLE_X, centerY: 60 + THOUGHT_BUBBLE_Y } ) );
    this.addChild( new ThoughtBubble( model, 15, { centerX: 90 + THOUGHT_BUBBLE_X, centerY: 105 + THOUGHT_BUBBLE_Y } ) );
    this.addChild( new ThoughtBubble( model, 12, { centerX: 62 + THOUGHT_BUBBLE_X, centerY: 165 + THOUGHT_BUBBLE_Y } ) );
    this.addChild( new ThoughtBubble( model, 7, { centerX: 50 + THOUGHT_BUBBLE_X, centerY: 220 + THOUGHT_BUBBLE_Y } ) );
  }

  return inherit( Node, ThoughtBubblesNode );
} );