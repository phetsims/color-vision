
define( function( require ) {
  'use strict';

  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Util = require( 'DOT/Util' );
  var VisibleColor = require( 'SCENERY_PHET/VisibleColor' );
  var Image = require( 'SCENERY/nodes/Image' );
  var WavelengthTrack = require( 'SCENERY_PHET/WavelengthTrack' );
  var inherit = require( 'PHET_CORE/inherit' );
  var WavelengthSlider = require( 'SCENERY_PHET/WavelengthSlider' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var Constants = require( 'COLOR_VISION/ColorVisionConstants' );

  /**
   * Slider track that displays the visible spectrum.
   * @param width
   * @param height
   * @param minWavelength
   * @param maxWavelength
   * @param opacity 0-1
   * @constructor
   */
  function GaussianWavelengthSlider( filterWavelengthProperty, width, height ) {

    Node.call( this );

    // Add lower WavelengthSlider
    var lowerSliderNodeTransparent = new WavelengthSlider( filterWavelengthProperty,
      {
        tweakersVisible: false,
        valueVisible: false,
        trackWidth: width,
        trackHeight: height,
        trackOpacity: 0.8,
        cursorVisible: false,
      } );
    this.addChild( lowerSliderNodeTransparent );

    var containerNode = new Node();

    var wavelengthTrack = new WavelengthTrack( width, height, VisibleColor.MIN_WAVELENGTH, VisibleColor.MAX_WAVELENGTH, 0.8 );
    containerNode.addChild( wavelengthTrack );
    this.addChild( containerNode );

    // function for a gaussian with mean 0 and standard deviation 0.5
    var constant = 1 / ( 0.5 * Math.sqrt( 2 * Math.PI ) );
    function gaussian( x ) {
      var exponent = -Math.pow( x, 2 );
      return constant * Math.pow( Math.E, exponent );
    }

    // this function is almost identical to the one in WavelengthSlider, perhaps it should be refactored out
    function wavelengthToPosition( wavelength ) {
      return Math.floor( Util.clamp( Util.linear( VisibleColor.MIN_WAVELENGTH, VisibleColor.MAX_WAVELENGTH, 0, wavelengthTrack.width, wavelength ), 0, wavelengthTrack.width ) );
    }

    // constants for determining the shape of the gaussian
    var numSamples = 40;
    var xOffset = width / 2 - numSamples / 2;

    var domainLinearFunction = new LinearFunction( 0, numSamples, -3, 3 );

    var gaussianCurve = new Shape().moveTo( wavelengthToPosition( filterWavelengthProperty.value ), wavelengthTrack.bottom );
    for ( var i = 0; i <= numSamples; i++ ) {
      var xCoord = domainLinearFunction( i );
      gaussianCurve.lineTo( i + xOffset, height - gaussian( xCoord ) * height * 1.2 );
    }
    gaussianCurve.close();

    var gaussianPath = new Path( gaussianCurve, { lineWidth: 1, stroke: 'white' } );
    this.addChild( gaussianPath );
    containerNode.setClipArea( gaussianCurve );

    filterWavelengthProperty.link( function( wavelength ) {
      var distance = containerNode.centerX - wavelengthToPosition( wavelength );
      containerNode.centerX = wavelengthToPosition( wavelength );
      gaussianPath.centerX -= distance;
      wavelengthTrack.centerX += distance;
    } );
  }

  inherit( Node, GaussianWavelengthSlider );

  return GaussianWavelengthSlider;
} );