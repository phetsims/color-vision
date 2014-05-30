// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for ColorVision sim
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var VisibleColor = require( 'SCENERY_PHET/VisibleColor' );
  var Constants = require( 'COLOR_VISION/ColorVisionConstants' );
  var SingleBulbPhotonBeam = require( 'COLOR_VISION/singlebulb/model/SingleBulbPhotonBeam' );

  /**
   * @constructor
   */
  function SingleBulbModel() {
    PropertySet.call( this, {
        light: 'colored',          // takes values 'white' and 'colored', to indicate what kind of light in the beam
        beam: 'beam',              // takes values 'beam' and 'photon', to indicate solid beam vs individual photons
        flashlightWavelength: 570, // default wavelength is yellow color
        filterWavelength: 570,
        flashlightOn: true,
        filterVisible: true,
        running: true,
        play: true
      }
    );

    this.perceivedColorProperty = this.toDerivedProperty(
      [
        'flashlightWavelength',
        'filterWavelength',
        'flashlightOn',
        'filterVisible',
        'light'
      ],
      function( flashlightWavelength, filterWavelength, flashlightOn, filterVisible, light ) {

        // if flashlight is not on, the perceived color is black
        if ( !flashlightOn ) {
          return 'black';

          // if the filter is visible, and the beam is colored
        }
        else if ( filterVisible && light === 'colored' ) {
          var percent;
          var halfWidth = Constants.GAUSSIAN_WIDTH / 2;

          // If the flashlightWavelength is outside the transmission width, no color passes.
          if ( flashlightWavelength < filterWavelength - halfWidth || flashlightWavelength > filterWavelength + halfWidth ) {
            percent = 0;
          }
          // flashlightWavelength is within the transmission width, pass a linear percentage.
          else {
            percent = 100 - ( ( Math.abs( filterWavelength - flashlightWavelength ) / halfWidth ) * 100 );
          }
          var newColor = VisibleColor.wavelengthToColor( flashlightWavelength ).copy();
          newColor.setAlpha( percent / 100 );
          return newColor;

        }
        // if the filter is visible, and the beam is white return the filter wavelength's color
        else if ( filterVisible && light === 'white' ) {
          return VisibleColor.wavelengthToColor( filterWavelength );

        }
        // if the beam is white and the filter is not visible, return white
        else if ( !filterVisible && light === 'white' ) {
          return 'white';
        }
        // if the filter is not visible return the flashlight wavelength's color
        else {
          return VisibleColor.wavelengthToColor( flashlightWavelength );
        }
      } );

    this.photonBeam = new SingleBulbPhotonBeam( this, Constants.SINGLE_BEAM_LENGTH );

  }

  return inherit( PropertySet, SingleBulbModel,
    {
      step: function( dt ) {
        this.photonBeam.updateAnimationFrame( dt );
      },

      reset: function() {
        PropertySet.prototype.reset.call( this );

        this.photonBeam.reset();
      }

    } );
} );
