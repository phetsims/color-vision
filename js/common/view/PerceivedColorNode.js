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

  /**
   * @param {Property.<Color|string>} perceivedColorProperty
   * @param {Object} [options]
   * @constructor
   */
  function PerceivedColorNode( perceivedColorProperty, options ) {

    options = options || {};

    // Add bubbles, from largest to smallest. Bubbles are positioned relative to the center of the largest bubble.
    assert && assert( !options.children, 'PerceivedColorNode sets children' );
    options.children = [
      new ThoughtBubble( perceivedColorProperty, 45, {
        centerX: 0,
        centerY: 0
      } ),
      new ThoughtBubble( perceivedColorProperty, 15, {
        centerX: -130,
        centerY: 45
      } ),
      new ThoughtBubble( perceivedColorProperty, 12, {
        centerX: -158,
        centerY: 105
      } ),
      new ThoughtBubble( perceivedColorProperty, 7, {
        centerX: -170,
        centerY: 160
      } )
    ];

    Node.call( this, options );
  }

  colorVision.register( 'PerceivedColorNode', PerceivedColorNode );

  return inherit( Node, PerceivedColorNode );
} );
 