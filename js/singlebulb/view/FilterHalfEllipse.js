// Copyright 2002-2013, University of Colorado Boulder

/**
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Shape = require( 'KITE/Shape' );
  var VisibleColor = require( 'SCENERY_PHET/VisibleColor' );

  /**
   * @param {Property} filterWavelengthProperty
   * @param {Property} filterVisibleProperty
   * @param {Number} centerX
   * @param {Number} centerY
   * @param {Number} radiusX
   * @param {Number} radiusY
   * @param {Number} left
   * @constructor
   */
  function FilterHalfEllipse( filterWavelengthProperty, filterVisibleProperty, centerX, centerY, radiusX, radiusY, left ) {

    Node.call( this );

    var shape = new Shape()
      .moveTo( centerX, centerY - radiusY )
      .ellipticalArc( centerX, centerY, radiusX, radiusY, 0, -Math.PI / 2, Math.PI / 2, left )
      .close();

    var path = new Path( shape );

    filterWavelengthProperty.link( function( wavelength ) {
      path.fill = VisibleColor.wavelengthToColor( wavelength );
    } );

    filterVisibleProperty.linkAttribute( this, 'visible' );

    this.addChild( path );
  }

  return inherit( Node, FilterHalfEllipse );
} );
