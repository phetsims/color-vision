// Copyright 2002-2013, University of Colorado Boulder

/**
 * Photon beam for single bulb view
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var CanvasNode = require( 'SCENERY/nodes/CanvasNode' );

  var debug = true;

  /**
   * @param {SingleBulbModel} model
   * @param {Bounds2} canvasBounds
   * @param {Object} options
   * @constructor
   */
  function SingleBulbPhotonBeamNode( model, canvasBounds, options ) {

    this.flashlightWavelength = model.flashlightWavelengthProperty;
    this.filterWavelength = model.filterWavelengthProperty;
    this.filterVisible = model.filterVisibleProperty;
    this.flashlightOn = model.flashlightOnProperty;

    this.photons = model.photonBeam.photons;

    this.beamBounds = canvasBounds;

    options = _.extend( { pickable: false, canvasBounds: canvasBounds }, options );

    CanvasNode.call( this, options );
    this.invalidatePaint();

  }

  return inherit( CanvasNode, SingleBulbPhotonBeamNode, {

    // @param {CanvasContextWrapper} wrapper
    paintCanvas: function( wrapper ) {
      var context = wrapper.context;

      if (debug) {
        context.fillStyle = 'rgba(50,50,50,0.5)';
        context.fillRect( 0, 0, this.beamBounds.maxX, this.beamBounds.maxY );
      }

      for ( var i = 0; i < this.photons.length; i++ ) {
        context.fillStyle = this.photons[i].intensity.toCSS();
        context.fillRect( this.photons[i].location.x, this.photons[i].location.y, 3, 2 );
      }
    },

    step: function( dt ) {
      this.invalidatePaint();
    }

  } );
} );
