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
  var LinearFunction = require( 'DOT/LinearFunction' );
  var VisibleColor = require( 'SCENERY_PHET/VisibleColor' );

  /**
   * @param {PhotonBeam} photonBeam
   * @param {Object} options
   * @constructor
   */
  function GaussianCanvasNode( filterWavelengthProperty, canvasBounds ) {

    CanvasNode.call( this, { canvasBounds: canvasBounds } );
    var thisNode = this;

    // set the number samples wide the gaussian will be
    this.numSamples = 50;
    this.canvasWidth = canvasBounds.maxX - canvasBounds.minX;
    this.canvasHeight = canvasBounds.maxY - canvasBounds.minY;
    console.log(this.canvasHeight);

    // for converting wavelength to position
    this.wavelengthToPosition = new LinearFunction( VisibleColor.MIN_WAVELENGTH, VisibleColor.MAX_WAVELENGTH, 0, this.canvasWidth, true );

    // function for a gaussian with mean 0 and standard deviation 0.5
    var constant = 1 / ( 0.5 * Math.sqrt( 2 * Math.PI ) );
    function gaussian( x ) {
      var exponent = -Math.pow( x, 2 );
      return constant * Math.pow( Math.E, exponent );
    }

    // save the coordinates of the outline of the gaussian in a table to avoid recomputing so much
    this.gaussianLookupTable = [];
    this.domainLinearFunction = new LinearFunction( 0, this.numSamples, -3, 3, true );
    for ( var i = 0; i < this.numSamples; i++ ) {
      var xCoord = this.domainLinearFunction( i );
      console.log(gaussian( xCoord ) * this.canvasHeight * 1.2);
      this.gaussianLookupTable.push( { x: xCoord, y: gaussian( xCoord ) * this.canvasHeight * 1.2 } );
    }

    this.colorLookup = [];
    for ( var j = 0; j < this.canvasWidth; j++ ) {
      var wavelength = this.wavelengthToPosition.inverse( j );
      this.colorLookup.push( VisibleColor.wavelengthToColor( wavelength ).toCSS() );
    }

    filterWavelengthProperty.link( function( wavelength ) {
      thisNode.gaussianPosition = Math.floor( thisNode.wavelengthToPosition( wavelength ) );
      thisNode.invalidatePaint();
    } );

    this.invalidatePaint();
  }

  return inherit( CanvasNode, GaussianCanvasNode, {

    // @param {CanvasContextWrapper} wrapper
    paintCanvas: function( wrapper ) {
      var context = wrapper.context;

      for ( var i = 0; i < this.numSamples; i++ ) {
        var colorIndex = i + this.gaussianPosition - this.numSamples / 2;
        context.fillStyle = this.colorLookup[colorIndex];
        context.fillRect( this.gaussianLookupTable[i].x + colorIndex, this.canvasHeight, 2, -this.gaussianLookupTable[i].y );
      }
    },

    step: function( dt ) {
      this.invalidatePaint();
    }

  } );
} );
