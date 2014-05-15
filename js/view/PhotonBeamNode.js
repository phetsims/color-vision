// Copyright 2002-2013, University of Colorado Boulder

/**
 * Photon beam
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jonathan Olson
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var CanvasNode = require( 'SCENERY/nodes/CanvasNode' );

  /**
   * @param {Bounds2} canvasBounds
   * @param {Array} photonBeam
   * @constructor
   */
  function PhotonBeamNode( canvasBounds, photonBeam ) {

    var thisNode = this;
    this.beamBounds = canvasBounds;
    this.photons = photonBeam.photons;
    this.color = photonBeam.color;

    CanvasNode.call( thisNode, { pickable: false, canvasBounds: canvasBounds } );
    this.invalidatePaint();

  }

  return inherit( CanvasNode, PhotonBeamNode, {

    // @param {CanvasContextWrapper} wrapper
    paintCanvas: function( wrapper ) {
      var context = wrapper.context;
      context.fillStyle = this.color;
      for ( var i = 0; i < this.photons.length; i++ ) {
        context.fillRect( this.photons[i].location.x, this.photons[i].location.y, 3, 2 );
      }
    },

    step: function( dt ) {
      this.invalidatePaint();
    }
  } );
} );
