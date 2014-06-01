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
  var Photon = require( 'COLOR_VISION/rgb/model/Photon' );
  var Constants = require( 'COLOR_VISION/ColorVisionConstants' );

  /**
   * @param {SingleBulbModel} model
   * @param {Number} size the length of the beam. This is used to determine what location to restart the photons.
   # @constructor
   */
  function SingleBulbPhotonBeam( model, size ) {
    this.photons = [];
    this.size = size;

    this.flashlightWavelength = model.flashlightWavelengthProperty;
    this.filterWavelength = model.filterWavelengthProperty;
    this.filterVisible = model.filterVisibleProperty;
    this.flashlightOn = model.flashlightOnProperty;
    this.light = model.lightProperty;
    this.perceivedColor = model.perceivedColorProperty;
    this.lastPhotonColor = model.lastPhotonColorProperty;
  }

  var updateAnimationFrame = function( dt ) {

    function randomColor() {
      var r = Math.floor( Math.random() * 256 );
      var g = Math.floor( Math.random() * 256 );
      var b = Math.floor( Math.random() * 256 );
      return new Color( r, g, b, 1 );
    }

    // the x-coordinate of the filter relative to this node's bounds
    var cutoff = 140;

    // initialize a contant rate of 5 new photons per animation frame
    var newColor;
    for ( var i = 0; i < 5; i++ ) {
      newColor = ( this.light.value === 'white' ) ? randomColor() : VisibleColor.wavelengthToColor( this.flashlightWavelength.value );
      var newPhoton = Photon.createFromPool( this.size, newColor );
      newPhoton.passedFilter = false;
      newPhoton.isWhite = this.light.value;
      this.photons.push( newPhoton );
    }

    // if the filter is visible, caluculate the percentage of photons to pass
    var halfWidth = Constants.GAUSSIAN_WIDTH / 2;
    var percent;
    if ( this.filterVisible.value ) {

      // If the beam is white, pass 30% of photons
      if ( this.light.value === 'white' ) {
        percent = 0.3;
      }

      // If the flashlightWavelength is outside the transmission width, no photons pass.
      else if ( this.flashlightWavelength.value < this.filterWavelength.value - halfWidth || this.flashlightWavelength.value > this.filterWavelength.value + halfWidth ) {
        percent = 0;
      }
      // flashlightWavelength is within the transmission width, pass a linear percentage.
      else {
        percent = 1 - ( ( Math.abs( this.filterWavelength.value - this.flashlightWavelength.value ) / halfWidth ) );
      }
    }

    var lastPhotonSet = false;

    // move all photons that are currently active
    for ( var j = 0; j < this.photons.length; j++ ) {

      // check if the photon needs to be filtered out
      if ( this.filterVisible.value ) {
        // check if the photon just passed through the filter
        if ( this.photons[j].location.x < cutoff && !this.photons[j].passedFilter ) {
          this.photons[j].passedFilter = true;

          if ( Math.random() >= percent ) {
            this.photons[j].freeToPool();
            this.photons.splice( j, 1 ); // remove jth photon from list

          // if the beam is white and the photon is not filtered, make sure it is the color of the filter
          } else if ( this.light.value === 'white') {
            this.photons[j].intensity = VisibleColor.wavelengthToColor( this.filterWavelength.value );
            this.photons[j].isWhite = true;
          }
        }
      }

      // otherwise move the photon unless it goes out of bounds
      if ( this.photons[j].location.x > 0 && this.photons[j].location.y > 0 && this.photons[j].location.y < Constants.BEAM_HEIGHT ) {
          this.photons[j].updateAnimationFrame( dt );
      } else {
        if ( !lastPhotonSet ) {
          if ( this.photons[j].isWhite && !this.filterVisible.value ) {
            this.lastPhotonColor.value = new Color( 255, 255, 255, 1 );
          } else {
            this.lastPhotonColor.value = this.photons[j].intensity;
          }
          lastPhotonSet = true;
        }
        this.photons[j].freeToPool();
        this.photons.splice( j, 1 ); // remove jth photon from list
      }
    }

    // if ( !lastPhotonSet ) {
    //   this.lastPhotonColor.value = new Color( 0, 0, 0, 1 );
    // }
  };

  var reset = function() {
    // set all photons to be out of bounds to trigger empty redraw
    for ( var i = 0; i < this.photons.length; i++ ) {
      this.photons[i].location.x = 0;
    }
  };

  return inherit( PropertySet, SingleBulbPhotonBeam, { updateAnimationFrame: updateAnimationFrame, reset: reset } );
} );
