// Copyright 2014-2015, University of Colorado Boulder

/**
 * FilterHalfEllipse is used to form the actual filter image. It is cut in half so
 * it can be layered with the beam above one half and below the other.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var VisibleColor = require( 'SCENERY_PHET/VisibleColor' );

  /**
   * @param {Property<Number>} filterWavelengthProperty
   * @param {Property<Number>} filterVisibleProperty
   * @param {Number} centerX
   * @param {Number} centerY
   * @param {Number} radiusX
   * @param {Number} radiusY
   * @param {boolean} left is true to draw the left half of the filter, false to draw the right
   * @constructor
   */
  function FilterHalfEllipse( filterWavelengthProperty, filterVisibleProperty, centerX, centerY, radiusX, radiusY, left ) {

    var shape = new Shape()
      .moveTo( centerX, centerY - radiusY )
      .ellipticalArc( centerX, centerY, radiusX, radiusY, 0, -Math.PI / 2, Math.PI / 2, left )
      .close();

    Path.call( this, shape );
    var thisNode = this;

    filterWavelengthProperty.link( function( wavelength ) {
      thisNode.fill = VisibleColor.wavelengthToColor( wavelength );
    } );

    filterVisibleProperty.linkAttribute( this, 'visible' );
  }

  return inherit( Path, FilterHalfEllipse );
} );