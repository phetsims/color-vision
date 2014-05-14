// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for PhotonBeam objects
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  function PhotonBeamNode( mvt, intensityProperty, orientation, width, heigth ) {

    Node.call( this );

    var rectangle = new Rectangle( 0, 0, width, heigth, 0, 0,
      {
        fill: 'rgba(100, 100, 100, 0.5)',
        rotation: orientation,
      } );

    this.addChild( rectangle );

  }

  return inherit( Node, PhotonBeamNode );
} );
