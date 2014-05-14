// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for ColorVisionSlider objects
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Shape = require( 'KITE/Shape' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );

  /**
   * @param {Photon} photon
   * @param {ModelViewTransform2} mvt
   */
  function PhotonNode( photon, mvt ) {

    Node.call( this );
    var thisNode = this;

    var scaleFactor = 2.55;
    console.log ( photon.color );

    var ellipse = new Shape().ellipse( 0, 0, 3, 2, 0 );
    var path = new Path( ellipse,
      {
        fill: photon.color,
        lineWidth: 0,
      } );

    this.addChild( path );

    // Register for properties for synchronization with model.
    photon.locationProperty.link( function( location ) {
      thisNode.translation = mvt.modelToViewPosition( location );
    } );

    photon.orientationProperty.link( function( orientation ) {
      thisNode.rotation = orientation;
    } );

    photon.colorProperty.link( function( color ) {
      thisNode.fill = color;
    } );

  }

  return inherit( Node, PhotonNode );
} );
