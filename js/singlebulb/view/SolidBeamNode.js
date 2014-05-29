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
   * @param {Bounds2} bounds
   * @constructor
   */
  function SolidBeamNode( filterWavelengthProperty, bounds ) {

    Node.call( this );

    var height = bounds.minY - bounds.maxY;
    var smallEndHeight = height * 0.9;
    var difference = ( height - smallEndHeight ) * 2;

    var shape = new Shape()
      .moveTo( bounds.minX, bounds.minY )
      .lineTo( bounds.minX, bounds.maxY )
      .lineTo( bounds.maxX, bounds.maxY + difference )
      .lineTo( bounds.maxX, bounds.minY - difference )
      .close();

    var path = new Path( shape, { opacity: 0.5 } );

    filterWavelengthProperty.link( function( wavelength ) {
      path.fill = VisibleColor.wavelengthToColor( wavelength );
    } );

    this.addChild( path );
  }

  return inherit( Node, SolidBeamNode );
} );
