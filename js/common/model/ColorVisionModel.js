// Copyright 2017-2020, University of Colorado Boulder

/**
 * Base type for the model in both screens.
 * See https://github.com/phetsims/color-vision/issues/117
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @abstract
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import inherit from '../../../../phet-core/js/inherit.js';
import colorVision from '../../colorVision.js';

/**
 * @param {Tandem} tandem
 * @constructor
 */
function ColorVisionModel( tandem ) {

  // @public {Property.<boolean>} is the model running?
  this.playingProperty = new BooleanProperty( true, {
    tandem: tandem.createTandem( 'playingProperty' )
  } );

  // @public {Property.<string>} which head view to show
  this.headModeProperty = new StringProperty( 'no-brain', {
    validValues: [ 'brain', 'no-brain' ],
    tandem: tandem.createTandem( 'headModeProperty' )
  } );

  // @public {DerivedProperty.<Color|string>}
  // the color perceived by the viewer, must be defined by the subtype.
  this.perceivedColorProperty = null;
}

colorVision.register( 'ColorVisionModel', ColorVisionModel );

inherit( Object, ColorVisionModel, {

  // @public
  reset: function() {
    this.playingProperty.reset();
    this.headModeProperty.reset();
  },

  // @public @abstract
  // step one frame, assuming 60fps
  manualStep: function() {
    throw new Error( 'must be defined by subtype' );
  }
} );

export default ColorVisionModel;