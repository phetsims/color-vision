// Copyright 2017, University of Colorado Boulder

/**
 * Base type for the model in both screens.
 * See https://github.com/phetsims/color-vision/issues/117
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @abstract
 */
define( function( require ) {
  'use strict';

  // modules
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var PropertyIO = require( 'AXON/PropertyIO' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );
  var TString = require( 'ifphetio!PHET_IO/types/TString' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function ColorVisionModel( tandem ) {

    // @public {Property.<boolean>} is the model running?
    this.playingProperty = new Property( true, {
      tandem: tandem.createTandem( 'playingProperty' ),
      phetioType: PropertyIO( TBoolean )
    } );

    // @public {Property.<string>} which head view to show
    this.headModeProperty = new Property( 'no-brain', {
      validValues: [ 'brain', 'no-brain' ],
      tandem: tandem.createTandem( 'headModeProperty' ),
      phetioType: PropertyIO( TString )
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
