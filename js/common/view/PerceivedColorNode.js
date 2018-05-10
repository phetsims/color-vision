// Copyright 2018, University of Colorado Boulder

/**
 * Displays the color perceived by the viewer in a set of cartoon-like 'thought bubbles'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

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

  inherit( Node, PerceivedColorNode );

  /**
   * One of the 'thought bubbles' in the perceived color display.
   * @param {Property.<Color|string>} perceivedColorProperty
   * @param {number} yRadius
   * @param {Object} [options]
   * @constructor
   */
  function ThoughtBubble( perceivedColorProperty, yRadius, options ) {

    options = _.extend( {
      lineWidth: 0.5,
      stroke: '#c0b9b9' // gray
    }, options );

    var ellipse = new Shape().ellipse( 0, 0, 2 * yRadius, yRadius, 0 );
    Path.call( this, ellipse, options );

    perceivedColorProperty.linkAttribute( this, 'fill' );
  }

  colorVision.register( 'PerceivedColorNode.ThoughtBubble', ThoughtBubble );

  inherit( Path, ThoughtBubble );

  return PerceivedColorNode;
} );
 