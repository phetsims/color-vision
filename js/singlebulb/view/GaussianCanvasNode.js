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

    // set the number wavelengths wide the gaussian will be
    this.gaussianWidth = 50;
    this.canvasHeight = canvasBounds.maxY - canvasBounds.minY;

    var canvasWidth = canvasBounds.maxX - canvasBounds.minX;

    // for converting wavelength to position
    var wavelengthToPosition = new LinearFunction( VisibleColor.MIN_WAVELENGTH, VisibleColor.MAX_WAVELENGTH, 0, canvasWidth, true );

    // function for a gaussian with mean 0 and standard deviation 0.5
    var constant = 1 / ( 0.5 * Math.sqrt( 2 * Math.PI ) );
    function gaussian( x ) {
      var exponent = -Math.pow( x, 2 );
      return constant * Math.pow( Math.E, exponent );
    }

    // save the coordinates of the outline of the gaussian in a table to avoid recomputing so much
    this.gaussianLookupTable = [];
    var domainLinearFunction = new LinearFunction( 0, this.gaussianWidth, -3, 3, true );
    for ( var i = 0; i < this.gaussianWidth; i++ ) {
      var xCoord = domainLinearFunction( i );
      // scale the height of the gaussian by the track height, and a little more to account of the fact that the max of the gaussian is not 1.
      this.gaussianLookupTable.push( gaussian( xCoord ) * this.canvasHeight * 1.2 );
    }

    // store the colors that match up exactly with the slider track
    this.colorLookup = [];
    for ( var j = 0; j < canvasWidth; j++ ) {
      var wavelength = wavelengthToPosition.inverse( j );
      console.log(wavelength);
      this.colorLookup.push( VisibleColor.wavelengthToColor( wavelength ).toCSS() );
    }

    filterWavelengthProperty.link( function( wavelength ) {
      thisNode.gaussianPosition = Math.round( wavelengthToPosition( wavelength ) );
      thisNode.invalidatePaint();
    } );
  }

  return inherit( CanvasNode, GaussianCanvasNode, {

    // @param {CanvasContextWrapper} wrapper
    paintCanvas: function( wrapper ) {
      var context = wrapper.context;

      for ( var i = 0; i < this.gaussianWidth; i++ ) {
        var colorIndex = i + this.gaussianPosition - this.gaussianWidth / 2;
        context.fillStyle = this.colorLookup[colorIndex];

        context.beginPath();
        context.moveTo( colorIndex, this.canvasHeight );
        context.lineTo( colorIndex, this.canvasHeight - this.gaussianLookupTable[i] );
        context.lineTo( colorIndex + 1, ( i < this.gaussianWidth - 1 ) ? this.canvasHeight - this.gaussianLookupTable[i + 1] : this.canvasHeight );
        context.lineTo( colorIndex + 1, this.canvasHeight );
        context.closePath();
        context.fill();

        // the width of the rectangles must be 2 in order to prevent gaps. Not sure why this is the case,
        // since the wavelengthSlider uses width 1.
        // context.fillRect( colorIndex, this.canvasHeight, 2, -this.gaussianLookupTable[i] );
      }
      console.log('end');
    }
  } );
} );
