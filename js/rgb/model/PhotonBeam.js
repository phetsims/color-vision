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
  var Photon = require( 'COLOR_VISION/rgb/model/Photon' );
  var Constants = require( 'COLOR_VISION/ColorVisionConstants' );

  /**
   * @param {String} color an rgb string
   * @param {Property} intensityProperty the intensity property for this color from the model
   * @param {Property} perceivedIntensityProperty the perceived intensity property for this color from the model
   * @param {Number} size the length of the beam
   # @constructor
   */
  function PhotonBeam( color, intensityProperty, perceivedIntensityProperty, size ) {
    this.photons = [];

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
    var numToCreate = ( intensity < cycleLength ) ? 1 : Math.floor( 0.05 * intensity );

    // only create new photons if intensity is greater than 0
    if ( intensity > 0 ) {
      if ( intensity >= cycleLength || this.frameCount % spacing === 0 ) {

        for ( var i = 0; i < numToCreate; i++ ) {
          this.photons.push( Photon.createFromPool( this.size, intensity ) );
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

      }
      else {
        this.perceivedIntensityProperty.value = this.photons[j].intensity;
        this.photons[j].freeToPool();
        this.photons.splice( j, 1 ); // remove jth photon from list
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
