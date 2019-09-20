// Copyright 2014-2019, University of Colorado Boulder

/**
 * Photon beam for single bulb view
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const CanvasNode = require( 'SCENERY/nodes/CanvasNode' );
  const colorVision = require( 'COLOR_VISION/colorVision' );
  const inherit = require( 'PHET_CORE/inherit' );

  /**
   * @param {SingleBulbModel} model
   * @param {Tandem} tandem
   * @param {Object} [options], must contain a canvasBounds attribute of type Bounds2
   * @constructor
   */
  function SingleBulbPhotonBeamNode( model, tandem, options ) {

    this.photons = model.photonBeam.photons;
    options.tandem = tandem;

    CanvasNode.call( this, options );

    const self = this;
    model.beamTypeProperty.link( function( beamType ) {
      self.visible = ( beamType === 'photon' );
    } );

    this.invalidatePaint();

    model.photonBeam.repaintEmitter.addListener( function() {
      self.invalidatePaint();
    } );
  }

  colorVision.register( 'SingleBulbPhotonBeamNode', SingleBulbPhotonBeamNode );

  return inherit( CanvasNode, SingleBulbPhotonBeamNode, {

    /**
     * @param {CanvasRenderingContext2D} context
     * @private
     */
    paintCanvas: function( context ) {

      for ( let i = 0; i < this.photons.length; i++ ) {
        context.fillStyle = this.photons[ i ].color.toCSS();
        context.fillRect( this.photons[ i ].location.x, this.photons[ i ].location.y, 3, 2 );
      }
    },

    // @public
    step: function( dt ) {
      this.invalidatePaint();
    }

  } );
} );
