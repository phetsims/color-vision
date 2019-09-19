// Copyright 2014-2018, University of Colorado Boulder

/**
 * GaussianWavelengthSlider acts the like WavelengthSlider from scenery-phet,
 * but with a Gaussian shape instead of the usual cursor.
 *
 * @author Aaron Davis
 */
define( require => {
  'use strict';

  // modules
  const colorVision = require( 'COLOR_VISION/colorVision' );
  const ColorVisionConstants = require( 'COLOR_VISION/common/ColorVisionConstants' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LinearFunction = require( 'DOT/LinearFunction' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Shape = require( 'KITE/Shape' );
  const SingleBulbConstants = require( 'COLOR_VISION/singlebulb/SingleBulbConstants' );
  const Util = require( 'DOT/Util' );
  const VisibleColor = require( 'SCENERY_PHET/VisibleColor' );
  const WavelengthSlider = require( 'SCENERY_PHET/WavelengthSlider' );
  const WavelengthSpectrumNode = require( 'SCENERY_PHET/WavelengthSpectrumNode' );

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
    const slider = new WavelengthSlider( filterWavelengthProperty, {
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
    const containerNode = new Node();

    const spectrumTrack = new WavelengthSpectrumNode( { size: new Dimension2( width, height ) } );
    containerNode.addChild( spectrumTrack );
    this.addChild( containerNode );

    // function for a gaussian with mean 0 and standard deviation 0.5
    const constant = 1 / ( 0.5 * Math.sqrt( 2 * Math.PI ) );

    function gaussian( x ) {
      const exponent = -Math.pow( x, 2 );
      return constant * Math.pow( Math.E, exponent );
    }

    // this function is almost identical to the one in WavelengthSlider, perhaps it should be refactored out
    function wavelengthToPosition( wavelength ) {
      return Math.floor( Util.clamp( Util.linear( VisibleColor.MIN_WAVELENGTH, VisibleColor.MAX_WAVELENGTH, 0, width, wavelength ), 0, width ) );
    }

    // constants for determining the shape of the gaussian
    const gaussianWidth = wavelengthToPosition( VisibleColor.MIN_WAVELENGTH + SingleBulbConstants.GAUSSIAN_WIDTH ) - wavelengthToPosition( VisibleColor.MIN_WAVELENGTH );
    const xOffset = width / 2 - gaussianWidth / 2;

    // use the domain [-3, 3] for calculating the gaussian to avoid long, flat stretches
    const domainLinearFunction = new LinearFunction( 0, gaussianWidth, -3, 3 );

    // create a gaussian shaped curve and set it as the clip area of the container node
    const gaussianCurve = new Shape().moveTo( xOffset, height );
    for ( let i = 0; i <= gaussianWidth; i++ ) {
      const xCoord = domainLinearFunction( i );
      gaussianCurve.lineTo( i + xOffset, height - gaussian( xCoord ) * height * 1.2 );
    }
    containerNode.setClipArea( gaussianCurve );

    // create a path for drawing the outline of the gaussian
    const gaussianPath = new Path( gaussianCurve, { lineWidth: 1, stroke: 'white' } );
    this.addChild( gaussianPath );

    filterWavelengthProperty.link( function( wavelength ) {
      const newPosition = wavelengthToPosition( wavelength );
      spectrumTrack.x = width / 2 - newPosition;
      containerNode.x = newPosition - width / 2;
      gaussianPath.centerX = newPosition;
    } );

    this.mutate( options );
  }

  colorVision.register( 'GaussianWavelengthSlider', GaussianWavelengthSlider );

  return inherit( Node, GaussianWavelengthSlider );
} );
