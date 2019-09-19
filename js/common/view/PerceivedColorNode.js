// Copyright 2018, University of Colorado Boulder

/**
 * Displays the color perceived by the viewer in a set of cartoon-like 'thought bubbles'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const colorVision = require( 'COLOR_VISION/colorVision' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Shape = require( 'KITE/Shape' );

  /**
   * @param {Property.<Color|string>} perceivedColorProperty
   * @param {Object} [options]
   * @constructor
   */
  function PerceivedColorNode( perceivedColorProperty, options ) {

    options = _.extend( {
      lineWidth: 0.5,
      stroke: '#c0b9b9' // gray
    }, options );

    // four thought bubbles, described from largest to smallest
    const shape = new Shape()
      .ellipse( 0, 0, 90, 45, 0 )
      .newSubpath()
      .ellipse( -130, 45, 30, 15, 0 )
      .newSubpath()
      .ellipse( -158, 105, 24, 12, 0 )
      .newSubpath()
      .ellipse( -170, 160, 14, 7, 0 );

    Path.call( this, shape, options );

    perceivedColorProperty.linkAttribute( this, 'fill' );
  }

  colorVision.register( 'PerceivedColorNode', PerceivedColorNode );

  return inherit( Path, PerceivedColorNode );
} );
 