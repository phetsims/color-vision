// Copyright 2014-2020, University of Colorado Boulder

/**
 * Photon beam for RGB screen
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import CanvasNode from '../../../../scenery/js/nodes/CanvasNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import colorVision from '../../colorVision.js';

// If this is set to true, it will show a rectangle around the beam.
// This is useful for getting the placement of the beam correct relative to the
// flashlight image.
const debug = false;

/**
 * @param {PhotonBeam} photonBeam
 * @param {Tandem} tandem
 * @param {Object} [options] (must contain a field canvasBounds to indicate the bounds of the beam)
 * @constructor
 */
function RGBPhotonBeamNode( photonBeam, tandem, options ) {

  const self = this;

  // @private
  this.beamBounds = options.canvasBounds;
  this.photons = photonBeam.photons;
  this.color = photonBeam.color;

  // Export for the sole purpose of having phet-io call invalidatePaint() after load complete
  options.tandem = tandem;

  CanvasNode.call( this, options );
  this.invalidatePaint();

  // TODO: alternatively, use the pattern in TrackNode?
  // In the state wrapper, when the state changes, we must update the skater node
  Tandem.PHET_IO_ENABLED && phet.phetio.phetioEngine.phetioStateEngine.stateSetEmitter.addListener( function() {
    self.invalidatePaint();
  } );
}

colorVision.register( 'RGBPhotonBeamNode', RGBPhotonBeamNode );

inherit( CanvasNode, RGBPhotonBeamNode, {

  /**
   * @param {CanvasRenderingContext2D} context
   * @private
   */
  paintCanvas: function( context ) {

    //If the debug flag is enabled, it will show the bounds of the canvas
    if ( debug ) {
      context.fillStyle = 'rgba(50,50,50,0.5)';
      context.fillRect( 0, 0, this.beamBounds.maxX, this.beamBounds.maxY );
    }

    context.fillStyle = this.color;
    for ( let i = 0; i < this.photons.length; i++ ) {
      // don't draw photons with intensity 0, since these are just used for ensuring the perceived color is black
      if ( this.photons[ i ].intensity !== 0 ) {
        context.fillRect( this.photons[ i ].position.x, this.photons[ i ].position.y, 3, 2 );
      }
    }
  },

  // @public
  step: function( dt ) {
    this.invalidatePaint();
  }

} );

export default RGBPhotonBeamNode;
