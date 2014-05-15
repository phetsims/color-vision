// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for Photon objects
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Shape = require( 'KITE/Shape' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @param {Photon} photon
   */
  function PhotonNode( photon ) {

    Node.call( this );
    var thisNode = this;

    var rectangle = new Rectangle( 0, 0, 3, 2,
      {
        fill: 'red'
      } );

    this.addChild( rectangle );

    // Register for properties for synchronization with model.
    photon.locationProperty.link( function( location ) {
      thisNode.translation = location;
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
