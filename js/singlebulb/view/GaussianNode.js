// Copyright 2002-2013, University of Colorado Boulder

/**
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Shape = require( 'KITE/Shape' );
  var VisibleColor = require( 'SCENERY_PHET/VisibleColor' );
  var Util = require( 'DOT/Util' );
  var Constants = require( 'COLOR_VISION/ColorVisionConstants' );

  /**
   * @param {Property} filterWavelengthProperty in units of wavelength
   * @param {Rectangle} track a rectangle bounding the WavelengthSlider track
   * @param {WavelengthSlider} wavelengthSlider the slider whose clipArea must be set to the gaussian shape
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

    // create a gaussian shape with many short line segments
    var createGaussian = function( position ) {
      var curve = new Shape().moveTo( xOffset, track.bottom );
      for ( var i = -distanceFromMean; i <= distanceFromMean; i += distanceFromMean * 2 / numSamples ) {
        curve.lineTo( i * xScale + xOffset + position, track.bottom - gaussian( i ) * height );
      }
      curve.close();
      return curve;
    };

    var curve = createGaussian( wavelengthToPosition( filterWavelengthProperty.value ) );

    var path = new Path( curve,
      {
        lineWidth: 0.5
      } );

    filterWavelengthProperty.link( function( wavelength ) {
      var position = wavelengthToPosition( wavelength );
      path.x = position + xScale;
      wavelengthSlider.setClipArea( createGaussian( position ) );
    } );

    this.addChild( path );
  }

  return inherit( Path, GaussianNode );
} );
