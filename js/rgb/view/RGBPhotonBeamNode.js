// Copyright 2014-2024, University of Colorado Boulder

/**
 * Photon beam for RGB screen
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import CanvasNode from '../../../../scenery/js/nodes/CanvasNode.js';
import phetioStateSetEmitter from '../../../../tandem/js/phetioStateSetEmitter.js';
import colorVision from '../../colorVision.js';

// If this is set to true, it will show a rectangle around the beam.
// This is useful for getting the placement of the beam correct relative to the
// flashlight image.
const debug = false;

class RGBPhotonBeamNode extends CanvasNode {

  /**
   * @param {PhotonBeam} photonBeam
   * @param {Tandem} tandem
   * @param {Object} [options] (must contain a field canvasBounds to indicate the bounds of the beam)
   */
  constructor( photonBeam, tandem, options ) {

    // Export for the sole purpose of having phet-io call invalidatePaint() after load complete
    options.tandem = tandem;

    super( options );

    // @private
    this.beamBounds = options.canvasBounds;
    this.photons = photonBeam.photons;
    this.color = photonBeam.color;

    this.invalidatePaint();

    // When the PhET-iO state has been set, we must invalidate the canvas, so it will be repainted before it is displayed
    phetioStateSetEmitter.addListener( () => {
      this.invalidatePaint();
    } );
  }


  /**
   * @param {CanvasRenderingContext2D} context
   * @private
   */
  paintCanvas( context ) {

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
  }

  // @public
  step( dt ) {
    this.invalidatePaint();
  }
}

colorVision.register( 'RGBPhotonBeamNode', RGBPhotonBeamNode );

export default RGBPhotonBeamNode;