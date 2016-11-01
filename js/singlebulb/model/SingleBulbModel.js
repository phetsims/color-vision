// Copyright 2014-2015, University of Colorado Boulder

/**
 * Model for 'Single Bulb' screen
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var VisibleColor = require( 'SCENERY_PHET/VisibleColor' );
  var Color = require( 'SCENERY/util/Color' );
  var SingleBulbPhotonBeam = require( 'COLOR_VISION/singlebulb/model/SingleBulbPhotonBeam' );
  var SingleBulbConstants = require( 'COLOR_VISION/singlebulb/SingleBulbConstants' );
  var EventTimer = require( 'PHET_CORE/EventTimer' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );
  var TString = require( 'ifphetio!PHET_IO/types/TString' );
  var TColor = require( 'PHET_IO/types/scenery/util/TColor' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function SingleBulbModel( tandem ) {

    var flashlightTandem = tandem.createTandem( 'flashlight' );
    var filterTandem = tandem.createTandem( 'filter' );

    // @public
    var properties = {

      lightType: {
        value: 'colored', // takes values 'white' and 'colored', to indicate what kind of light in the beam
        tandem: tandem.createTandem( 'lightTypeProperty' ),
        phetioValueType: TString
      },

      beamType: {
        value: 'beam', // takes values 'beam' and 'photon', to indicate solid beam vs individual photons
        tandem: tandem.createTandem( 'beamTypeProperty' ),
        phetioValueType: TString
      },

      flashlightWavelength: {
        value: 570, // in units of nm, default wavelength is yellow color TODO check #108
        tandem: flashlightTandem.createTandem( 'flashlightWavelengthProperty' ),
        phetioValueType: TNumber( { units: 'nanometers' } )
      },

      filterWavelength: {
        value: 570, // in units of nm, default wavelength is yellow color
        tandem: filterTandem.createTandem( 'filterWavelengthProperty' ),
        phetioValueType: TNumber( { units: 'nanometers' } )
      },

      flashlightOn: {
        value: false,
        tandem: flashlightTandem.createTandem( 'flashlightOnProperty' ),
        phetioValueType: TBoolean
      },

      filterVisible: {
        value: false,
        tandem: filterTandem.createTandem( 'filterVisibleProperty' ),
        phetioValueType: TBoolean
      },

      playing: {
        value: true,
        tandem: tandem.createTandem( 'playingProperty' ),
        phetioValueType: TBoolean
      },

      headMode: {
        value: 'no-brain', // takes values 'brain' and 'no-brain'
        tandem: tandem.createTandem( 'headModeProperty' ),
        phetioValueType: TString
      },

      // keep track of the last photon to hit the eye, for use in calculating the perceived color
      lastPhotonColor: {
        value: new Color( 0, 0, 0, 0 )
      }
    };

    PropertySet.call( this, null, properties );

    // the color perceived by the person depends on almost every property
    // @public
    this.addDerivedProperty( 'perceivedColor', [
      'flashlightWavelength',
      'filterWavelength',
      'flashlightOn',
      'filterVisible',
      'lightType',
      'beamType',
      'lastPhotonColor'
    ], function( flashlightWavelength, filterWavelength, flashlightOn, filterVisible, lightType, beamType, lastPhotonColor ) {

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
      phetioValueType: TColor
    } );

    // @public
    this.photonBeam = new SingleBulbPhotonBeam( this, SingleBulbConstants.SINGLE_BEAM_LENGTH, tandem.createTandem( 'photonBeam' ) );

    var self = this;

    // create a new photon every 1/120 seconds
    // @private
    this.eventTimer = new EventTimer( new EventTimer.ConstantEventModel( 120 ), function( timeElapsed ) {
      self.photonBeam.createPhoton( timeElapsed );
    } );
  }

  colorVision.register( 'SingleBulbModel', SingleBulbModel );

  return inherit( PropertySet, SingleBulbModel,
    {
      // @public
      step: function( dt ) {
        if ( this.playing ) {
          this.photonBeam.updateAnimationFrame( dt );
          this.eventTimer.step( dt );
        }
      },

      // step one frame, assuming 60fps
      // @public
      manualStep: function() {
        this.photonBeam.updateAnimationFrame( 1 / 60 );
        this.eventTimer.step( 1 / 60 );
      },

      // @public
      reset: function() {
        PropertySet.prototype.reset.call( this );
        this.photonBeam.reset();
      }
    } );
} );
