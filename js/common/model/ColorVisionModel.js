// Copyright 2017-2018, University of Colorado Boulder

/**
 * Base type for the model in both screens.
 * See https://github.com/phetsims/color-vision/issues/117
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @abstract
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const colorVision = require( 'COLOR_VISION/colorVision' );
  const inherit = require( 'PHET_CORE/inherit' );
  const StringProperty = require( 'AXON/StringProperty' );

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

  return inherit( Object, ColorVisionModel, {

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
} );
