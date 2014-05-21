// Copyright 2002-2013, University of Colorado Boulder

/**
 * Photon beam
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var CanvasNode = require( 'SCENERY/nodes/CanvasNode' );

  /**
   * @param {Bounds2} canvasBounds
   * @param {PhotonBeam} photonBeam
   * @constructor
   */
  function PhotonBeamNode( canvasBounds, photonBeam, options ) {

    this.beamBounds = canvasBounds;
    this.photons = photonBeam.photons;
    this.color = photonBeam.color;

    options = _.extend( { pickable: false, canvasBounds: canvasBounds }, options );

    CanvasNode.call( this, options );
    this.invalidatePaint();

  }

  return inherit( CanvasNode, PhotonBeamNode, {

    // @param {CanvasContextWrapper} wrapper
    paintCanvas: function( wrapper ) {
      var context = wrapper.context;
      /* uncomment to show rectangle around beam */
      // context.fillStyle = 'rgba(50,50,50,0.5)';
      // context.fillRect( 0, 0, this.beamBounds.maxX, this.beamBounds.maxY );

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
