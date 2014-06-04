// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model of a photon beam, made of individual photon particles.
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
  var SingleBulbPhoton = require( 'COLOR_VISION/singlebulb/model/SingleBulbPhoton' );
  var Constants = require( 'COLOR_VISION/ColorVisionConstants' );

  /**
   * @param {SingleBulbModel} model
   * @param {Number} size the length of the beam. This is used to determine what location to restart the photons.
   # @constructor
   */
  function SingleBulbPhotonBeam( model, size ) {
    this.photons = [];
    this.size = size;

    // keep a reference to all the needed properties, would it be better to inherit from SingleBulbModel?
    this.flashlightWavelength = model.flashlightWavelengthProperty;
    this.filterWavelength = model.filterWavelengthProperty;
    this.filterVisible = model.filterVisibleProperty;
    this.flashlightOn = model.flashlightOnProperty;
    this.light = model.lightProperty;
    this.lastPhotonColor = model.lastPhotonColorProperty;
    this.perceivedColor = model.perceivedColorProperty;
  }

  var updateAnimationFrame = function( dt ) {

    function randomColor() {
      var r = Math.floor( Math.random() * 256 );
      var g = Math.floor( Math.random() * 256 );
      var b = Math.floor( Math.random() * 256 );
      return new Color( r, g, b, 1 );
    }

    // if the filter is visible, caluculate the percentage of photons to pass
    var halfWidth = Constants.GAUSSIAN_WIDTH / 2;
    var percent = 1;
    if ( this.filterVisible.value ) {

      // If the flashlightWavelength is outside the transmission width, no photons pass.
      if ( this.flashlightWavelength.value < this.filterWavelength.value - halfWidth || this.flashlightWavelength.value > this.filterWavelength.value + halfWidth ) {
        percent = 0;
      }
      // flashlightWavelength is within the transmission width, pass a linear percentage.
      else {
        percent = 1 - ( ( Math.abs( this.filterWavelength.value - this.flashlightWavelength.value ) / halfWidth ) );
      }
    }

    // initialize a contant rate of 5 new photons per animation frame if the flashlight is on
    if ( this.flashlightOn.value ) {
      for ( var i = 0; i < 5; i++ ) {
        var newColor = ( this.light.value === 'white' ) ? randomColor() : VisibleColor.wavelengthToColor( this.flashlightWavelength.value );
        var newPhoton = SingleBulbPhoton.createFromPool( this.size, 1, newColor, ( this.light.value === 'white' ) );
        this.photons.push( newPhoton );
      }
    }

    // keep track of whether or not we have set the last photon to cross out of bounds during this animation frame
    var lastPhotonSet = false;

    // move all photons that are currently active
    for ( var j = 0; j < this.photons.length; j++ ) {
      var photon = this.photons[j];

      // check if the photon just passed through the filter location
      if ( this.filterVisible.value && photon.location.x < this.filterOffset && !photon.passedFilter ) {

        // set the percent to be 30% for white photons
        percent = ( !photon.wasWhite ) ? percent : 0.3;

        // remove a percentage of photons from the beam
        if ( Math.random() >= percent ) {
          photon.freeToPool();
          this.photons.splice( j, 1 ); // remove jth photon from list
        }
        // if the beam is white, make sure it is the color of the filter
        else if ( photon.isWhite ) {
          photon.color = VisibleColor.wavelengthToColor( this.filterWavelength.value );
          photon.isWhite = false;
        }
        // if the photon is not white
        else {
          // set the photonIntensity to be the same as the percentage passing through the filter,
          // for use when setting the perceived color when the photon hits the eye.
          // make sure the intensity is at least 0.2, otherwise it looks too black in the view
          photon.intensity = ( percent < 0.2 ) ? 0.2 : percent;
        }
      }

      // keep track of photons which pass the filter
      if ( photon.location.x < this.filterOffset ) {
        photon.passedFilter = true;
      }

      // otherwise move the photon unless it goes out of bounds
      if ( photon.location.x > 0 && photon.location.y > 0 && photon.location.y < Constants.BEAM_HEIGHT ) {
        photon.updateAnimationFrame( dt );

      // if the photon goes out of bounds, update the lastPhotonColor property, which is used in determining the perceived color
      } else {
        if ( !lastPhotonSet ) {
          if ( photon.isWhite ) {
            this.lastPhotonColor.value = new Color( 255, 255, 255, 1 );
          } else {
            // set the intensity of the plast photon to leave so we know to adjust the intensity of the perceived color
            var colorWithIntensity = photon.color.copy();
            if ( !photon.wasWhite ) {
              colorWithIntensity.setAlpha( photon.intensity );
            }
            this.lastPhotonColor.value = colorWithIntensity;
          }
          lastPhotonSet = true;
        }
        photon.freeToPool();
        this.photons.splice( j, 1 ); // remove jth photon from list
      }
    }

    // emit a black photon for reseting the perceived color to black if no more photons passing through the filter
    if ( percent === 0 && this.filterVisible.value && !this.perceivedColor.value.equals( Color.BLACK ) ) {
      var blackPhoton = SingleBulbPhoton.createFromPool( this.filterOffset, 1, Color.BLACK.withAlpha( 0 ), false );
      blackPhoton.passedFilter = true;
      this.photons.push( blackPhoton );
    }
  };

  var reset = function() {
    // set all photons to be out of bounds to trigger empty redraw
    for ( var i = 0; i < this.photons.length; i++ ) {
      this.photons[i].location.x = 0;
    }
  };

  return inherit( PropertySet, SingleBulbPhotonBeam, { updateAnimationFrame: updateAnimationFrame, reset: reset } );
} );
