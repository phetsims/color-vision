// Copyright 2018-2022, University of Colorado Boulder

/**
 * Displays the color perceived by the viewer in a set of cartoon-like 'thought bubbles'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Shape } from '../../../../kite/js/imports.js';
import merge from '../../../../phet-core/js/merge.js';
import { Path } from '../../../../scenery/js/imports.js';
import colorVision from '../../colorVision.js';

class PerceivedColorNode extends Path {

  /**
   * @param {Property.<Color|string>} perceivedColorProperty
   * @param {Object} [options]
   */
  constructor( perceivedColorProperty, options ) {

    options = merge( {
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

    super( shape, options );

    perceivedColorProperty.linkAttribute( this, 'fill' );
  }
}

colorVision.register( 'PerceivedColorNode', PerceivedColorNode );

export default PerceivedColorNode;