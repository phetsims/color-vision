// Copyright 2014-2017, University of Colorado Boulder

/**
 * GaussianWavelengthSlider acts the like WavelengthSlider from scenery-phet,
 * but with a Gaussian shape instead of the usual cursor.
 *
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  // modules
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var ColorVisionConstants = require( 'COLOR_VISION/common/ColorVisionConstants' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var SingleBulbConstants = require( 'COLOR_VISION/singlebulb/SingleBulbConstants' );
  var Util = require( 'DOT/Util' );
  var VisibleColor = require( 'SCENERY_PHET/VisibleColor' );
  var WavelengthSlider = require( 'SCENERY_PHET/WavelengthSlider' );
  var WavelengthSpectrumNode = require( 'SCENERY_PHET/WavelengthSpectrumNode' );

  /**
   * Wavelength slider with a gaussian
   * @param {Property.<number>} filterWavelengthProperty
   * @param {number} width the width of the track
   * @param {number} height the height of the track
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function GaussianWavelengthSlider( filterWavelengthProperty, width, height, tandem, options ) {

    Node.call( this );

    // Add lower WavelengthSlider
    var slider = new WavelengthSlider( filterWavelengthProperty, {
      tandem: tandem,
      tweakersVisible: false,
      valueVisible: false,
      trackWidth: width,
      trackHeight: height,
      trackOpacity: 0.5,
      cursorVisible: false,
      thumbWidth: 30,
      thumbHeight: 40,
      thumbTouchAreaYDilation: 10,
      trackBorderStroke: ColorVisionConstants.SLIDER_BORDER_STROKE
    } );
    this.addChild( slider );

    // Create an empty node for taking the gaussian clip area. This node will shift the opposite direction as the
    // wavelength track in order to create the effect of the gaussian moving without having to redraw the shape
    var containerNode = new Node();

    var spectrumTrack = new WavelengthSpectrumNode( { size: new Dimension2( width, height ) } );
    containerNode.addChild( spectrumTrack );
    this.addChild( containerNode );

    // function for a gaussian with mean 0 and standard deviation 0.5
    var constant = 1 / ( 0.5 * Math.sqrt( 2 * Math.PI ) );

    function gaussian( x ) {
      var exponent = -Math.pow( x, 2 );
      return constant * Math.pow( Math.E, exponent );
    }

    // this function is almost identical to the one in WavelengthSlider, perhaps it should be refactored out
    function wavelengthToPosition( wavelength ) {
      return Math.floor( Util.clamp( Util.linear( VisibleColor.MIN_WAVELENGTH, VisibleColor.MAX_WAVELENGTH, 0, width, wavelength ), 0, width ) );
    }

    // constants for determining the shape of the gaussian
    var gaussianWidth = wavelengthToPosition( VisibleColor.MIN_WAVELENGTH + SingleBulbConstants.GAUSSIAN_WIDTH ) - wavelengthToPosition( VisibleColor.MIN_WAVELENGTH );
    var xOffset = width / 2 - gaussianWidth / 2;

    // use the domain [-3, 3] for calculating the gaussian to avoid long, flat stretches
    var domainLinearFunction = new LinearFunction( 0, gaussianWidth, -3, 3 );

    // create a gaussian shaped curve and set it as the clip area of the container node
    var gaussianCurve = new Shape().moveTo( xOffset, height );
    for ( var i = 0; i <= gaussianWidth; i++ ) {
      var xCoord = domainLinearFunction( i );
      gaussianCurve.lineTo( i + xOffset, height - gaussian( xCoord ) * height * 1.2 );
    }
    containerNode.setClipArea( gaussianCurve );

    // create a path for drawing the outline of the gaussian
    var gaussianPath = new Path( gaussianCurve, { lineWidth: 1, stroke: 'white' } );
    this.addChild( gaussianPath );

    filterWavelengthProperty.link( function( wavelength ) {
      var newPosition = wavelengthToPosition( wavelength );
      spectrumTrack.x = width / 2 - newPosition;
      containerNode.x = newPosition - width / 2;
      gaussianPath.centerX = newPosition;
    } );

    this.mutate( options );
  }

  colorVision.register( 'GaussianWavelengthSlider', GaussianWavelengthSlider );

  return inherit( Node, GaussianWavelengthSlider );
} );
