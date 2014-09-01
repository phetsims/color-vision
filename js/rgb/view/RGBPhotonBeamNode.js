// Copyright 2002-2014, University of Colorado Boulder

/**
 * Photon beam for RGB screen
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var CanvasNode = require( 'SCENERY/nodes/CanvasNode' );

  // If this is set to true, it will show a rectangle around the beam.
  // This is useful for getting the placement of the beam correct relative to the
  // flashlight image.
  var debug = false;

  /**
   * @param {PhotonBeam} photonBeam
   * @param {Object} options (must contain a field canvasBounds to indicate the bounds of the beam)
   * @constructor
   */
  function RGBPhotonBeamNode( photonBeam, options ) {

    this.beamBounds = options.canvasBounds;
    this.photons = photonBeam.photons;
    this.color = photonBeam.color;

    CanvasNode.call( this, options );
    this.invalidatePaint();
  }

  return inherit( CanvasNode, RGBPhotonBeamNode, {

    // @param {CanvasContextWrapper} wrapper
    paintCanvas: function( wrapper ) {
      var context = wrapper.context;

      //If the debug flag is enabled, it will show the bounds of the canvas
      if ( debug ) {
        context.fillStyle = 'rgba(50,50,50,0.5)';
        context.fillRect( 0, 0, this.beamBounds.maxX, this.beamBounds.maxY );
      }

      context.fillStyle = this.color;
      for ( var i = 0; i < this.photons.length; i++ ) {
        // don't draw photons with intensity 0, since these are just used for ensuring the perceived color is black
        if ( this.photons[i].intensity !== 0 ) {
          context.fillRect( this.photons[i].location.x, this.photons[i].location.y, 3, 2 );
        }
      }
    },

    step: function( dt ) {
      this.invalidatePaint();
    }

  } );
} );
