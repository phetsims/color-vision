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
   * @param {Property} flashlightWavelengthProperty
   * @param {Property} filterWavelengthProperty
   * @param {Property} onProperty
   * @param {Bounds2} bounds
   * @constructor
   */
  function SolidBeamNode( flashlightWavelengthProperty, filterWavelengthProperty, onProperty, bounds, cutoff ) {

    Node.call( this );

    // use the principle of similar triangles to calculate where to split the beam
    var width = bounds.maxX - bounds.minX;
    var triangleHeight = 8; // half the difference between the large end and small end of the beam
    var ratio = triangleHeight / width;
    var smallerTriangleHeight = ( bounds.maxX - cutoff ) * ratio;

    var leftHalf = new Shape()
      .moveTo( bounds.minX, bounds.minY )
      .lineTo( bounds.minX, bounds.maxY )
      .lineTo( cutoff, bounds.maxY + smallerTriangleHeight )
      .lineTo( cutoff, bounds.minY - smallerTriangleHeight )
      .close();

    var rightHalf = new Shape()
      .moveTo( cutoff, bounds.minY - smallerTriangleHeight )
      .lineTo( cutoff, bounds.maxY + smallerTriangleHeight )
      .lineTo( bounds.maxX, bounds.maxY + triangleHeight )
      .lineTo( bounds.maxX, bounds.minY - triangleHeight )
      .close();

    var leftPath = new Path( leftHalf, { opacity: 0.5 } );
    var rightPath = new Path( rightHalf, { opacity: 0.9 } );

    function fillFilteredBeam( wavelength ) {
      // this is just a first approximation, needs improvement
      if ( Math.abs( flashlightWavelengthProperty.value - filterWavelengthProperty.value ) < 20 ) {
        leftPath.fill = VisibleColor.wavelengthToColor( wavelength );
      }
      else {
        leftPath.fill = 'rgba(0,0,0,0)';
      }
    }

    flashlightWavelengthProperty.link( function( wavelength ) {
      // if ( onProperty.value ) {
        rightPath.fill = VisibleColor.wavelengthToColor( wavelength );
        fillFilteredBeam( wavelength );
      // }
    } );

    filterWavelengthProperty.link( function( wavelength ) {
      // if ( onProperty.value ) {
        fillFilteredBeam( wavelength );
      // }
    } );

    onProperty.link( function( isOn ) {
      if ( !isOn ) {
        leftPath.fill = 'rgba(0,0,0,0)';
        rightPath.fill = 'rgba(0,0,0,0)';
      } else {
        rightPath.fill = VisibleColor.wavelengthToColor( flashlightWavelengthProperty.value );
        fillFilteredBeam( flashlightWavelengthProperty.value );
      }
    } );

    this.addChild( leftPath );
    this.addChild( rightPath );
  }

  return inherit( Node, SolidBeamNode );
} );
