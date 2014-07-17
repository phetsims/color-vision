// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for 'Single Bulb' screen
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var VisibleColor = require( 'SCENERY_PHET/VisibleColor' );
  var Color = require( 'SCENERY/util/Color' );
  var SingleBulbPhotonBeam = require( 'COLOR_VISION/singlebulb/model/SingleBulbPhotonBeam' );
  var SingleBulbConstants = require( 'COLOR_VISION/singlebulb/SingleBulbConstants' );
  var EventTimer = require( 'PHET_CORE/EventTimer' );

  /**
   * @constructor
   */
  function SingleBulbModel() {
    PropertySet.call( this, {
        light: 'colored',          // takes values 'white' and 'colored', to indicate what kind of light in the beam
        beam: 'beam',              // takes values 'beam' and 'photon', to indicate solid beam vs individual photons
        flashlightWavelength: 570, // in units of wavelengths, default wavelength is yellow color
        filterWavelength: 570,     // in units of wavelengths, default wavelength is yellow color
        flashlightOn: false,
        filterVisible: false,
        play: true,                // is the sim running or paused
        headMode: 'brain',         // takes values 'brain' and 'no-brain'

        // keep track of the last photon to hit the eye for use in calculating the perceived color
        lastPhotonColor: new Color( 0, 0, 0, 0 )
      }
    );

    // the color perceived by the person depends on almost every property
    this.addDerivedProperty( 'perceivedColor',
      [
        'flashlightWavelength',
        'filterWavelength',
        'flashlightOn',
        'filterVisible',
        'light',
        'beam',
        'lastPhotonColor'
      ],
      function( flashlightWavelength, filterWavelength, flashlightOn, filterVisible, light, beam, lastPhotonColor ) {

        // If the beam is in photon mode, return the color of the last photon to hit the eye.
        // The logic for handling all of the cases where the beam is in photon mode is in the file
        // SingleBulbPhotonBeam, where lastPhotonColor is set.
        if ( beam === 'photon' ) {
          return lastPhotonColor;
        }
        // if flashlight is not on, the perceived color is black
        else if ( !flashlightOn ) {
          return Color.BLACK;
        }
        // if the filter is visible, and the beam is colored, calculate the percentage of color to pass
        else if ( filterVisible && light === 'colored' ) {
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
        else if ( filterVisible && light === 'white' ) {
          return VisibleColor.wavelengthToColor( filterWavelength );
        }
        // if the beam is white and the filter is not visible, return white
        else if ( !filterVisible && light === 'white' ) {
          return Color.WHITE;
        }
        // if the filter is not visible, return the flashlight wavelength's color
        else {
          return VisibleColor.wavelengthToColor( flashlightWavelength );
        }
      } );

    this.photonBeam = new SingleBulbPhotonBeam( this, SingleBulbConstants.SINGLE_BEAM_LENGTH );

    var thisModel = this;

    // create a new photon every 1/120 seconds
    this.eventTimer = new EventTimer( new EventTimer.ConstantEventModel( 120 ), function( timeElapsed ) {
      thisModel.photonBeam.createPhoton( timeElapsed );
    } );
  }

  return inherit( PropertySet, SingleBulbModel,
    {
      step: function( dt ) {
        if ( this.play ) {
          this.photonBeam.updateAnimationFrame( dt );
          this.eventTimer.step( dt );
        }
      },

      // step one frame, assuming 60fps
      manualStep: function() {
        this.photonBeam.updateAnimationFrame( 1 / 60 );
      },

      reset: function() {
        PropertySet.prototype.reset.call( this );
        this.photonBeam.reset();
      }
    } );
} );
