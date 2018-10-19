// Copyright 2014-2017, University of Colorado Boulder

/**
 * Model for 'Single Bulb' screen
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanIO = require( 'TANDEM/types/BooleanIO' );
  var Color = require( 'SCENERY/util/Color' );
  var ColorIO = require( 'SCENERY/util/ColorIO' );
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var ColorVisionModel = require( 'COLOR_VISION/common/model/ColorVisionModel' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  var EventTimer = require( 'PHET_CORE/EventTimer' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Property = require( 'AXON/Property' );
  var PropertyIO = require( 'AXON/PropertyIO' );
  var Range = require( 'DOT/Range' );
  var SingleBulbConstants = require( 'COLOR_VISION/singlebulb/SingleBulbConstants' );
  var SingleBulbPhotonBeam = require( 'COLOR_VISION/singlebulb/model/SingleBulbPhotonBeam' );
  var StringIO = require( 'TANDEM/types/StringIO' );
  var VisibleColor = require( 'SCENERY_PHET/VisibleColor' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function SingleBulbModel( tandem ) {

    ColorVisionModel.call( this, tandem );

    var flashlightTandem = tandem.createTandem( 'flashlight' );
    var filterTandem = tandem.createTandem( 'filter' );

    // @public {Property.<string>} kind of light in the beam
    this.lightTypeProperty = new Property( 'colored', {
      validValues: [ 'white', 'colored' ],
      tandem: tandem.createTandem( 'lightTypeProperty' ),
      phetioType: PropertyIO( StringIO )
    } );

    // @public {Property.<string>} indicates solid beam vs individual photons
    this.beamTypeProperty = new Property( 'beam', {
      validValues: [ 'beam', 'photon' ],
      tandem: tandem.createTandem( 'beamTypeProperty' ),
      phetioType: PropertyIO( StringIO )
    } );

    // @public {Property.<number>} in units of nm, default wavelength is yellow
    this.flashlightWavelengthProperty = new NumberProperty( 570, {
      tandem: flashlightTandem.createTandem( 'flashlightWavelengthProperty' ),
      units: 'nanometers',
      range: new Range( VisibleColor.MIN_WAVELENGTH, VisibleColor.MAX_WAVELENGTH )
    } );

    // @public {Property.<number>} in units of nm, default wavelength is yellow
    this.filterWavelengthProperty = new NumberProperty( 570, {
      tandem: filterTandem.createTandem( 'filterWavelengthProperty' ),
      units: 'nanometers',
      range: new Range( VisibleColor.MIN_WAVELENGTH, VisibleColor.MAX_WAVELENGTH )
    } );

    // @public {Property.<boolean>} is the flashlight on?
    this.flashlightOnProperty = new Property( false, {
      tandem: flashlightTandem.createTandem( 'flashlightOnProperty' ),
      phetioType: PropertyIO( BooleanIO )
    } );

    // @public {Property.<boolean>} is the filter on?
    this.filterVisibleProperty = new Property( false, {
      tandem: filterTandem.createTandem( 'filterVisibleProperty' ),
      phetioType: PropertyIO( BooleanIO )
    } );

    // @public {Property.<Color|string>} keep track of the last photon to hit the eye,
    // for use in calculating the perceived color
    this.lastPhotonColorProperty = new Property( new Color( 0, 0, 0, 0 ) );

    // @public {DerivedProperty.<Color|string>} the color perceived by the person depends on almost every property
    this.perceivedColorProperty = new DerivedProperty( [
        this.flashlightWavelengthProperty,
        this.filterWavelengthProperty,
        this.flashlightOnProperty,
        this.filterVisibleProperty,
        this.lightTypeProperty,
        this.beamTypeProperty,
        this.lastPhotonColorProperty
      ],
      function( flashlightWavelength, filterWavelength, flashlightOn, filterVisible, lightType, beamType, lastPhotonColor ) {

        // If the beam is in photon mode, return the color of the last photon to hit the eye.
        // The logic for handling all of the cases where the beam is in photon mode is in the file
        // SingleBulbPhotonBeam, where lastPhotonColor is set.
        if ( beamType === 'photon' ) {
          return lastPhotonColor;
        }
        // if flashlight is not on, the perceived color is black
        else if ( !flashlightOn ) {
          return Color.BLACK;
        }
        // if the filter is visible, and the beam type is colored, calculate the percentage of color to pass
        else if ( filterVisible && lightType === 'colored' ) {
          var alpha; // the new alpha value for the color, porportional to the percentage of light to pass through the filter
          var halfWidth = SingleBulbConstants.GAUSSIAN_WIDTH / 2;

          // If the flashlightWavelength is outside the transmission width, no color passes.
          if ( flashlightWavelength < filterWavelength - halfWidth || flashlightWavelength > filterWavelength + halfWidth ) {
            alpha = 0;
          }
          // flashlightWavelength is within the transmission width, pass a linear percentage.
          else {
            alpha = 1 - Math.abs( filterWavelength - flashlightWavelength ) / halfWidth;
          }
          return VisibleColor.wavelengthToColor( flashlightWavelength ).withAlpha( alpha );
        }
        // if the filter is visible, and the beam is white, return the filter wavelength's color
        else if ( filterVisible && lightType === 'white' ) {
          return VisibleColor.wavelengthToColor( filterWavelength );
        }
        // if the beam is white and the filter is not visible, return white
        else if ( !filterVisible && lightType === 'white' ) {
          return Color.WHITE;
        }
        // if the filter is not visible, return the flashlight wavelength's color
        else {
          return VisibleColor.wavelengthToColor( flashlightWavelength );
        }
      }, {
        tandem: tandem.createTandem( 'perceivedColorProperty' ),
        phetioType: DerivedPropertyIO( ColorIO )
      } );

    // @public
    this.photonBeam = new SingleBulbPhotonBeam( this, SingleBulbConstants.SINGLE_BEAM_LENGTH, {
      tandem: tandem.createTandem( 'photonBeam' )
    } );

    var self = this;

    // create a new photon every 1/120 seconds
    // @private
    this.eventTimer = new EventTimer( new EventTimer.ConstantEventModel( 120 ), function( timeElapsed ) {
      self.photonBeam.createPhoton( timeElapsed );
    } );
  }

  colorVision.register( 'SingleBulbModel', SingleBulbModel );

  return inherit( ColorVisionModel, SingleBulbModel, {

    // @public
    step: function( dt ) {

      // Cap dt, see https://github.com/phetsims/color-vision/issues/115 and https://github.com/phetsims/joist/issues/130
      dt = Math.min( dt, 0.5 );

      if ( this.playingProperty.value ) {
        this.photonBeam.updateAnimationFrame( dt );
        this.eventTimer.step( dt );
      }
    },

    // @public @override
    // step one frame, assuming 60fps
    manualStep: function() {
      this.photonBeam.updateAnimationFrame( 1 / 60 );
      this.eventTimer.step( 1 / 60 );
    },

    // @public @override
    reset: function() {

      ColorVisionModel.prototype.reset.call( this );

      this.lightTypeProperty.reset();
      this.beamTypeProperty.reset();
      this.flashlightWavelengthProperty.reset();
      this.filterWavelengthProperty.reset();
      this.flashlightOnProperty.reset();
      this.filterVisibleProperty.reset();
      this.lastPhotonColorProperty.reset();

      this.photonBeam.reset();
    }
  } );
} );
