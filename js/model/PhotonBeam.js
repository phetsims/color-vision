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
  var Photon = require( 'COLOR_VISION/model/Photon' );

  /**
   * @param {Color} color
   */
  function PhotonBeam( color, intensityProperty, len ) {

    // constants
    this.maxPhotons = 300;
    this.velocity = new Vector2( -4, 0 );

    this.photons = [];      // for photons in use
    this.photonPool = [];   // for recycled photons

    this.color = color;
    this.intensityProperty = intensityProperty;
    this.len = len;
    this.frameCount = 0;

  }

  var updateAnimationFrame = function( dt ) {

    // cycle length and spacing are using to keep track of how many animation frames
    // to skip between photons when the intesity level is low
    var cycleLength = 20;
    var intensity = this.intensityProperty.value;
    var spacing = Math.floor( cycleLength / intensity );

    // create number of new photons proportional to intensity (between 1 and 5)
    if ( intensity < cycleLength ) {
      numToCreate = 1;
    } else {
      var numToCreate = Math.floor( 0.05 * intensity );
    }

    // only create new photons if intensity is greater than 0
    if ( intensity > 0 ) {
      if ( intensity >= cycleLength || this.frameCount % spacing == 0 ) {

        for ( var i = 0; i < numToCreate; i++ ) {

          // if there are photons in the recycled pool, use these
          if ( this.photonPool.length > 0 ) {
            var photon = this.photonPool.pop();
            photon.location.x = this.len;
            this.photons.push( photon );

          // otherwise, create a new photon
          } else if ( this.photons.length <= this.maxPhotons ) {
            this.photons.push( new Photon( new Vector2( this.len, Math.floor( Math.random() * 50 ) ), this.velocity ) );
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

      if ( this.photons[j].location.x > 0 ) {
        this.photons[j].updateAnimationFrame( dt );

      } else {
        this.photonPool.push( this.photons[j] );
        this.photons.splice( j, 1 );
      }

    }
  };

  return inherit( PropertySet, PhotonBeam, { updateAnimationFrame: updateAnimationFrame } );
} );
