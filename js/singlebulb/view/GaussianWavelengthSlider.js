// Copyright 2014-2020, University of Colorado Boulder

/**
 * GaussianWavelengthSlider acts the like WavelengthSlider from scenery-phet,
 * but with a Gaussian shape instead of the usual cursor.
 *
 * @author Aaron Davis
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import LinearFunction from '../../../../dot/js/LinearFunction.js';
import Utils from '../../../../dot/js/Utils.js';
import Shape from '../../../../kite/js/Shape.js';
import inherit from '../../../../phet-core/js/inherit.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import WavelengthSlider from '../../../../scenery-phet/js/WavelengthSlider.js';
import WavelengthSpectrumNode from '../../../../scenery-phet/js/WavelengthSpectrumNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import colorVision from '../../colorVision.js';
import ColorVisionConstants from '../../common/ColorVisionConstants.js';
import SingleBulbConstants from '../SingleBulbConstants.js';

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
    return Math.floor( Utils.clamp( Utils.linear( VisibleColor.MIN_WAVELENGTH, VisibleColor.MAX_WAVELENGTH, 0, width, wavelength ), 0, width ) );
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

inherit( Node, GaussianWavelengthSlider );
export default GaussianWavelengthSlider;