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

  /**
   * @param {SingleBulbModel} model
   * @param {Object} options, must contain a canvasBounds attribute of type Bounds2
   * @constructor
   */
  function SingleBulbPhotonBeamNode( model, options ) {

    this.flashlightWavelength = model.flashlightWavelengthProperty;
    this.filterWavelength = model.filterWavelengthProperty;
    this.filterVisible = model.filterVisibleProperty;
    this.flashlightOn = model.flashlightOnProperty;

    this.photons = model.photonBeam.photons;

    CanvasNode.call( this, options );

    var visibleProperty = model.toDerivedProperty( [ 'flashlightOn', 'beam' ],
      function( flashlightOn, beamProperty ) {
        return ( flashlightOn && beamProperty === 'photon' );
      } );
    visibleProperty.linkAttribute( this, 'visible' );

    this.invalidatePaint();
  }

  return inherit( CanvasNode, SingleBulbPhotonBeamNode, {

    // @param {CanvasContextWrapper} wrapper
    paintCanvas: function( wrapper ) {
      var context = wrapper.context;

      for ( var i = 0; i < this.photons.length; i++ ) {
        // if ( this.photons[i].location.x > 100 || this.photons[i].location.x < 150 ) {
          // if ( this.filterVisible.value && this.photons[i].location.x > cutoff )
          context.fillStyle = this.photons[i].intensity.toCSS();
          context.fillRect( this.photons[i].location.x, this.photons[i].location.y, 3, 2 );
        // }
      }
    },

    step: function( dt ) {
      this.invalidatePaint();
    }

  } );
} );
