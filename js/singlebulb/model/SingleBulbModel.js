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

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function SingleBulbModel( tandem ) {

    var flashlightTandem = tandem.createTandem( 'flashlight' );
    var filterTandem = tandem.createTandem( 'filter' );

    PropertySet.call( this, {

      // @public
      lightType: 'colored',        // takes values 'white' and 'colored', to indicate what kind of light in the beam
      beamType: 'beam',            // takes values 'beam' and 'photon', to indicate solid beam vs individual photons
      flashlightWavelength: 570,   // in units of wavelengths, default wavelength is yellow color
      filterWavelength: 570,       // in units of wavelengths, default wavelength is yellow color
      flashlightOn: false,
      filterVisible: false,
      playing: true,               // is the sim running or paused
      headMode: 'no-brain',        // takes values 'brain' and 'no-brain'
      lastPhotonColor: new Color( 0, 0, 0, 0 ) // keep track of the last photon to hit the eye for use in calculating the perceived color
    }, {
      tandemSet: {
        flashlightWavelength: flashlightTandem.createTandem( 'flashlightWavelengthProperty' ),
        lightType: tandem.createTandem( 'lightTypeProperty' ),
        beamType: tandem.createTandem( 'beamTypeProperty' ),
        filterWavelength: filterTandem.createTandem( 'filterWavelengthProperty' ),
        flashlightOn: flashlightTandem.createTandem( 'flashlightOnProperty' ),
        filterVisible: filterTandem.createTandem( 'filterVisibleProperty' ),
        playing: tandem.createTandem( 'playingProperty' ),
        headMode: tandem.createTandem( 'headModeProperty' )
      }
    } );

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
    } );

    // @public
    this.photonBeam = new SingleBulbPhotonBeam( this, SingleBulbConstants.SINGLE_BEAM_LENGTH, tandem.createTandem( 'photonBeam' ) );

    var thisModel = this;

    // create a new photon every 1/120 seconds
    // @private
    this.eventTimer = new EventTimer( new EventTimer.ConstantEventModel( 120 ), function( timeElapsed ) {
      thisModel.photonBeam.createPhoton( timeElapsed );
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
