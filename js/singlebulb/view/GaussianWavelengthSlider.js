// Copyright 2014-2024, University of Colorado Boulder

/**
 * GaussianWavelengthSlider acts the like WavelengthSlider from scenery-phet,
 * but with a Gaussian shape instead of the usual cursor.
 *
 * @author Aaron Davis
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import LinearFunction from '../../../../dot/js/LinearFunction.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import { Shape } from '../../../../kite/js/imports.js';
import SpectrumSliderThumb from '../../../../scenery-phet/js/SpectrumSliderThumb.js';
import SpectrumSliderTrack from '../../../../scenery-phet/js/SpectrumSliderTrack.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import WavelengthSpectrumNode from '../../../../scenery-phet/js/WavelengthSpectrumNode.js';
import { Node, Path, Rectangle } from '../../../../scenery/js/imports.js';
import Slider from '../../../../sun/js/Slider.js';
import colorVision from '../../colorVision.js';
import ColorVisionStrings from '../../ColorVisionStrings.js';
import ColorVisionConstants from '../../common/ColorVisionConstants.js';
import SingleBulbConstants from '../SingleBulbConstants.js';

class GaussianWavelengthSlider extends Node {

  /**
   * Wavelength slider with a gaussian
   * @param {Property.<number>} filterWavelengthProperty
   * @param {number} width the width of the track
   * @param {number} height the height of the track
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( filterWavelengthProperty, width, height, tandem, options ) {

    super();

    // Add lower WavelengthSlider
    const colorSpectrumRange = new Range( VisibleColor.MIN_WAVELENGTH, VisibleColor.MAX_WAVELENGTH );
    const spectrumSliderTrack = new SpectrumSliderTrack( filterWavelengthProperty, colorSpectrumRange, {
      size: new Dimension2( width, height ),
      opacity: 0.5,
      borderRectangleOptions: {
        stroke: null // We create the border elsewhere so that it is not affected by this Node's opacity
      },
      valueToColor: function( value ) {
        return VisibleColor.wavelengthToColor( value );
      },
      tandem: tandem.createTandem( 'spectrumSliderTrack' )
    } );

    const thumbNode = new SpectrumSliderThumb( filterWavelengthProperty, {
      width: 30,
      height: 40,
      lineWidth: 0.5,
      windowCursorOptions: {
        visible: false
      },
      valueToColor: function( value ) {
        return VisibleColor.wavelengthToColor( value );
      },
      tandem: tandem.createTandem( 'thumbNode' )
    } );

    const slider = new Slider( filterWavelengthProperty, colorSpectrumRange, {
      accessibleName: ColorVisionStrings.filterSlider.labelStringProperty,
      tandem: tandem,
      tweakersVisible: false,
      valueVisible: false,
      trackNode: spectrumSliderTrack,
      thumbNode: thumbNode
    } );
    this.addChild( slider );

    // We don't want the border to be affected by opacity.
    const spectrumSliderTrackWithBorder = new Rectangle( 0, 0, spectrumSliderTrack.width, spectrumSliderTrack.height, {
      stroke: ColorVisionConstants.SLIDER_BORDER_STROKE,
      lineWidth: 1
    } );
    this.addChild( spectrumSliderTrackWithBorder );

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
      const xCoord = domainLinearFunction.evaluate( i );
      gaussianCurve.lineTo( i + xOffset, height - gaussian( xCoord ) * height * 1.2 );
    }
    containerNode.setClipArea( gaussianCurve );

    // create a path for drawing the outline of the gaussian
    const gaussianPath = new Path( gaussianCurve, { lineWidth: 1, stroke: 'white' } );
    this.addChild( gaussianPath );

    filterWavelengthProperty.link( wavelength => {
      const newPosition = wavelengthToPosition( wavelength );
      spectrumTrack.x = width / 2 - newPosition;
      containerNode.x = newPosition - width / 2;
      gaussianPath.centerX = newPosition;
    } );

    this.mutate( options );
  }
}

colorVision.register( 'GaussianWavelengthSlider', GaussianWavelengthSlider );

export default GaussianWavelengthSlider;