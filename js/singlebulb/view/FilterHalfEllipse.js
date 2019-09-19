// Copyright 2014-2017, University of Colorado Boulder

/**
 * FilterHalfEllipse is used to form the actual filter image. It is cut in half so
 * it can be layered with the beam above one half and below the other.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const colorVision = require( 'COLOR_VISION/colorVision' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Shape = require( 'KITE/Shape' );
  const VisibleColor = require( 'SCENERY_PHET/VisibleColor' );

  /**
   * @param {Property.<number>} filterWavelengthProperty
   * @param {Property.<number>} filterVisibleProperty
   * @param {number} centerX
   * @param {number} centerY
   * @param {number} radiusX
   * @param {number} radiusY
   * @param {boolean} left is true to draw the left half of the filter, false to draw the right
   * @constructor
   */
  function FilterHalfEllipse( filterWavelengthProperty, filterVisibleProperty, centerX, centerY, radiusX, radiusY, left ) {

    var shape = new Shape()
      .moveTo( centerX, centerY - radiusY )
      .ellipticalArc( centerX, centerY, radiusX, radiusY, 0, -Math.PI / 2, Math.PI / 2, left )
      .close();

    Path.call( this, shape );
    var self = this;

    filterWavelengthProperty.link( function( wavelength ) {
      self.fill = VisibleColor.wavelengthToColor( wavelength );
    } );

    filterVisibleProperty.linkAttribute( this, 'visible' );
  }

  colorVision.register( 'FilterHalfEllipse', FilterHalfEllipse );

  return inherit( Path, FilterHalfEllipse );
} );