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
  var RGBPhoton = require( 'COLOR_VISION/rgb/model/RGBPhoton' );
  var Constants = require( 'COLOR_VISION/ColorVisionConstants' );

  // constants
  var CYCLE_LENGTH = 20; // how many animation frames to keep track of before starting over

  /**
   * @param {String} color an rgb string
   * @param {Property} intensityProperty the intensity property for this color from the model
   * @param {Property} perceivedIntensityProperty the perceived intensity property for this color from the model
   * @param {Number} beamLength the length of the beam, used to calculate the starting x coordinate
   # @constructor
   */
  function RGBPhotonBeam( color, intensityProperty, perceivedIntensityProperty, beamLength ) {
    this.photons = [];

    this.color = color;
    this.intensityProperty = intensityProperty;
    this.perceivedIntensityProperty = perceivedIntensityProperty;
    this.beamLength = beamLength;
    this.frameCount = 0;
  }

  var updateAnimationFrame = function( dt ) {

    var intensity = this.intensityProperty.value;

    // spacing keeps track of how many animations frames to skip between creating new photons when the intensity is low.
    // this feature wasn't in the Java code, but I thought that creating a photon every frame looked too intense when the
    // intensity was set as low as it could go.
    var spacing = Math.floor( CYCLE_LENGTH / intensity );

    // create number of new photons proportional to intensity (between 1 and 5)
    var numToCreate = ( intensity < CYCLE_LENGTH ) ? 1 : Math.floor( 0.05 * intensity );

    // only create new photons if intensity is greater than 0
    if ( intensity > 0 ) {
      // if the intensity is low, don't create photons on every frame
      if ( intensity >= CYCLE_LENGTH || this.frameCount % spacing === 0 ) {

        for ( var i = 0; i < numToCreate; i++ ) {
          var newPhoton = RGBPhoton.createFromPool( this.beamLength, intensity );

          // randomly offset the starting location of the photon
          newPhoton.location.x += Math.random() * newPhoton.velocity.x * dt;
          this.photons.push( newPhoton );
        }
      }

      this.frameCount++;
      if ( this.frameCount >= CYCLE_LENGTH ) {
        this.frameCount = 0;
      }
    }

    // move all photons that are currently active
    for ( var j = 0; j < this.photons.length; j++ ) {

      if ( this.photons[j].location.x > 0 && this.photons[j].location.y > 0 && this.photons[j].location.y < Constants.BEAM_HEIGHT ) {
        this.photons[j].updateAnimationFrame( dt );

      }
      else {
        this.perceivedIntensityProperty.value = this.photons[j].intensity;
        this.photons[j].freeToPool();
        this.photons.splice( j, 1 ); // remove jth RGBPhoton from list
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

  return inherit( PropertySet, RGBPhotonBeam, { updateAnimationFrame: updateAnimationFrame, reset: reset } );
} );
