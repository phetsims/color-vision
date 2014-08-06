// Copyright 2002-2014, University of Colorado Boulder

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

  /**
   * @param {SingleBulbModel} model
   * @param {Object} options, must contain a canvasBounds attribute of type Bounds2
   * @constructor
   */
  function SingleBulbPhotonBeamNode( model, options ) {

    this.photons = model.photonBeam.photons;

    CanvasNode.call( this, options );

    this.beamBounds = options.canvasBounds;

    var thisNode = this;
    model.beamProperty.link( function( beam ) {
      thisNode.visible = ( beam === 'photon' );
    } );

    this.invalidatePaint();
  }

  return inherit( CanvasNode, SingleBulbPhotonBeamNode, {

    // @param {CanvasContextWrapper} wrapper
    paintCanvas: function( wrapper ) {
      var context = wrapper.context;

      for ( var i = 0; i < this.photons.length; i++ ) {

        // prevent the photons from getting painted outside of the bounds of the canvas
        // if this isn't done, the photons might get stuck on the screen in the wrong places on screen resize
        // see https://github.com/phetsims/color-vision/issues/18
        if ( this.beamBounds.minimumDistanceToPointSquared( this.photons[i].location ) === 0 ) {
          context.fillStyle = this.photons[i].color.toCSS();
          context.fillRect( this.photons[i].location.x, this.photons[i].location.y, 3, 2 );
        }
      }
    },

    step: function( dt ) {
      this.invalidatePaint();
    }

  } );
} );
