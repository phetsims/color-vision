// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model of a photon beam.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Vector2 = require( 'DOT/Vector2' );
  var Photon = require( 'COLOR_VISION/rgb/model/Photon' );
  var Constants = require( 'COLOR_VISION/ColorVisionConstants' );

  /**
   * @param {Color} color
   */
  function PhotonBeam( color, intensityProperty, perceivedIntensityProperty, size ) {

    // constants
    this.maxPhotons = 800;
    this.velocity = new Vector2( -4, 0 );

    this.photons = [];      // for photons in use
    this.photonPool = [];   // for recycled photons

    this.color = color;
    this.intensityProperty = intensityProperty;
    this.perceivedIntensityProperty = perceivedIntensityProperty;
    this.size = size;
    this.frameCount = 0;

  }

  var updateAnimationFrame = function( dt ) {

    // cycle length and spacing are using to keep track of how many animation frames
    // to skip between photons when the intesity level is low
    var cycleLength = 20;
    var intensity = this.intensityProperty.value;
    var spacing = Math.floor( cycleLength / intensity );

    // create number of new photons proportional to intensity (between 1 and 5)
    var numToCreate;
    if ( intensity < cycleLength ) {
      numToCreate = 1;
    } else {
      numToCreate = Math.floor( 0.05 * intensity );
    }

    // only create new photons if intensity is greater than 0
    if ( intensity > 0 ) {
      if ( intensity >= cycleLength || this.frameCount % spacing === 0 ) {

        for ( var i = 0; i < numToCreate; i++ ) {

          var yVelocity = Math.random() * 1.25 - 0.625;
          var yLocation = yVelocity * 25 + ( Constants.BEAM_HEIGHT / 2 );

          // if there are photons in the recycled pool, use these
          if ( this.photonPool.length > 0 ) {
            var photon = this.photonPool.pop();
            photon.intensity = intensity;
            photon.location.y = yLocation;
            photon.location.x = this.size;
            photon.velocity.y = yVelocity;
            this.photons.push( photon );

          // otherwise, create a new photon
          } else if ( this.photons.length <= this.maxPhotons ) {
            this.photons.push( new Photon( new Vector2( this.size, yLocation ), new Vector2( -4, yVelocity ) , intensity ) );
          }

        }
      }

      this.frameCount++;
      if ( this.frameCount >= cycleLength ) {
        this.frameCount = 0;
      }
    }

    // move all photons that are currently active
    for ( var j = 0; j < this.photons.length; j++ ) {

      if ( this.photons[j].location.x > 0 && this.photons[j].location.y > 0 && this.photons[j].location.y < Constants.BEAM_HEIGHT ) {
        this.photons[j].updateAnimationFrame( dt );

      } else {
        this.perceivedIntensityProperty.value = this.photons[j].intensity;
        this.photonPool.push( this.photons[j] );
        this.photons.splice( j, 1 );
      }

    }

    // make sure that the intensity is 0 if there are no more photons
    if ( this.photons.length === 0 ) {
      this.perceivedIntensityProperty.value = 0;
    }
  };

  var reset = function() {
    // set all photons to be out of bounds to trigger empty redraw
    for ( var i = 0; i < this.photons.length; i++ ) {
      this.photons[i].location.x = 0;
    }
  };

  return inherit( PropertySet, PhotonBeam, { updateAnimationFrame: updateAnimationFrame, reset: reset } );
} );
