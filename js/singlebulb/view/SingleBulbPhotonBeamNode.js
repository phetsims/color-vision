// Copyright 2014-2015, University of Colorado Boulder

/**
 * Photon beam for single bulb view
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var inherit = require( 'PHET_CORE/inherit' );
  var CanvasNode = require( 'SCENERY/nodes/CanvasNode' );

  // phet-io modules
  var TNode = require( 'ifphetio!PHET_IO/types/scenery/nodes/TNode' );

  /**
   * @param {SingleBulbModel} model
   * @param {Tandem} tandem
   * @param {Object} [options], must contain a canvasBounds attribute of type Bounds2
   * @constructor
   */
  function SingleBulbPhotonBeamNode( model, tandem, options ) {

    this.photons = model.photonBeam.photons;

    CanvasNode.call( this, options );

    var thisNode = this;
    model.beamTypeProperty.link( function( beamType ) {
      thisNode.visible = ( beamType === 'photon' );
    } );

    this.invalidatePaint();

    // Export for the sole purpose of having phetio.js call invalidatePaint() after load complete
    tandem.addInstance( this, TNode );
  }

  colorVision.register( 'SingleBulbPhotonBeamNode', SingleBulbPhotonBeamNode );

  return inherit( CanvasNode, SingleBulbPhotonBeamNode, {

    /**
     * @param {CanvasRenderingContext2D} context
     * @private
     */
    paintCanvas: function( context ) {

      for ( var i = 0; i < this.photons.length; i++ ) {
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
