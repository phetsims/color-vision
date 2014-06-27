// Copyright 2002-2013, University of Colorado Boulder

/**
 * Add a group of four thought bubbles to the view. Factored out here because it is used in both screens
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var ThoughtBubble = require( 'COLOR_VISION/common/view/ThoughtBubble' );

  // constants
  // used for moving the thought bubbles together as a group in case minor adjustments are needed
  var THOUGHT_BUBBLE_X = -15;
  var THOUGHT_BUBBLE_Y = -10;

  /**
   * @param {PropertySet} model the model being used, either RGBModel or SingleBulbModel
   * @param {ScreenView} view the screen view being used, either RGBScreenView or SingleBulbScreenView
   * @constructor
   */
  function addThoughtBubbles( model, view ) {
    view.addChild( new ThoughtBubble( model, 45, { centerX: 220 + THOUGHT_BUBBLE_X, centerY: 60 + THOUGHT_BUBBLE_Y } ) );
    view.addChild( new ThoughtBubble( model, 15, { centerX: 90 + THOUGHT_BUBBLE_X, centerY: 105 + THOUGHT_BUBBLE_Y } ) );
    view.addChild( new ThoughtBubble( model, 12, { centerX: 62 + THOUGHT_BUBBLE_X, centerY: 165 + THOUGHT_BUBBLE_Y } ) );
    view.addChild( new ThoughtBubble( model, 7, { centerX: 50 + THOUGHT_BUBBLE_X, centerY: 220 + THOUGHT_BUBBLE_Y } ) );
  }

  return addThoughtBubbles;
} );