// Copyright 2002-2013, University of Colorado Boulder

/**
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Shape = require( 'KITE/Shape' );
  var VisibleColor = require( 'SCENERY_PHET/VisibleColor' );
  var Util = require( 'DOT/Util' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var Constants = require( 'COLOR_VISION/ColorVisionConstants' );

  /**
   * @param {Property} filterWavelengthProperty in units of wavelength
   * @param {Rectangle} track a rectangle bounding the WavelengthSlider track
   * @param {WavelengthSlider} wavelengthSlider the slider whose clipArea will be set to the gaussian shape
   * @constructor
   */
  function GaussianNode( filterWavelengthProperty, track, wavelengthSlider ) {

    Node.call( this );

    // function for a gaussian with mean 0 and standard deviation 0.5
    var constant = 1 / ( 0.5 * Math.sqrt( 2 * Math.PI ) );
    function gaussian( x ) {
      var exponent = -Math.pow( x, 2 );
      return constant * Math.pow( Math.E, exponent );
    }

    // this function is almost identical to the one in WavelengthSlider, perhaps it should be refactored out
    function wavelengthToPosition( wavelength ) {
      return Math.floor( Util.clamp( Util.linear( VisibleColor.MIN_WAVELENGTH, VisibleColor.MAX_WAVELENGTH, 0, track.width, wavelength ), 0, track.width ) );
    }

    // constants for determining the shape of the gaussian
    var numSamples = 50;
    var distanceFromMean = wavelengthToPosition( VisibleColor.MIN_WAVELENGTH + ( Constants.GAUSSIAN_WIDTH / 2 ) );
    var height = track.bottom - track.top;
    var xScale = 10;
    var xOffset = track.left - 18;

    // save the coordinates of the outline of the gaussian in a table to avoid recomputing so much
    this.gaussianLookupTable = [];
    var domainLinearFunction = new LinearFunction( 0, numSamples, -distanceFromMean, distanceFromMean, true );
    for ( var i = 0; i < numSamples; i++ ) {
      var xCoord = domainLinearFunction( i );
      this.gaussianLookupTable.push( { x: xCoord * xScale + xOffset, y: track.bottom - gaussian( xCoord ) * height } );
    }

    /**
     * The createGaussian function returns a Shape object that looks like a gaussian.
     * @param {Number} position the x-coordinate of the gaussian within the wavelength slider track
     */
    var thisNode = this;
    var createGaussian = function( position ) {
      var curve = new Shape().moveTo( xOffset + position, track.bottom );
      for ( var i = 0; i < numSamples; i++ ) {
        curve.lineTo( thisNode.gaussianLookupTable[i].x + position, thisNode.gaussianLookupTable[i].y );
      }
      curve.close();
      return curve;
    };

    filterWavelengthProperty.link( function( wavelength ) {
      wavelengthSlider.setClipArea( createGaussian( wavelengthToPosition( wavelength ) ) );
    } );
  }

  return inherit( Node, GaussianNode );
} );
