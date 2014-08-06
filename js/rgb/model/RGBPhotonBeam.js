// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model of the photon beams used on the RGB screen, made of individual photon particles.
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
  var Vector2 = require( 'DOT/Vector2' );

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

  return inherit( PropertySet, RGBPhotonBeam, {

    updateAnimationFrame: function( dt ) {

      // move all photons that are currently active
      for ( var i = 0; i < this.photons.length; i++ ) {

        if ( this.photons[i].location.x > 0 && this.photons[i].location.y > 0 && this.photons[i].location.y < Constants.BEAM_HEIGHT ) {
          this.photons[i].updateAnimationFrame( dt );

        }
        else {
          this.perceivedIntensityProperty.value = this.photons[i].intensity;
          this.photons.splice( i, 1 ); // remove jth RGBPhoton from list
        }

      }

      // make sure that the intensity is 0 if there are no more photons
      if ( this.photons.length === 0 ) {
        this.perceivedIntensityProperty.value = 0;
      }
    },

    createPhoton: function( timeElapsed ) {
      var intensity = this.intensityProperty.value;

      // only create a new photon if intensity is greater than 0
      if ( intensity > 0 ) {
        var x = this.beamLength + Constants.X_VELOCITY * timeElapsed;
        var yVelocity = ( Math.random() * Constants.FAN_FACTOR - ( Constants.FAN_FACTOR / 2 ) ) * 60;

        var initialY = yVelocity * ( 25 / 60 ) + ( Constants.BEAM_HEIGHT / 2 );
        var deltaY = yVelocity * timeElapsed;
        var y = initialY + deltaY;

        this.photons.push( new RGBPhoton( new Vector2( x, y ), new Vector2( Constants.X_VELOCITY, yVelocity ), intensity ) );
      }
    },

    reset: function() {
      // set all photons to be out of bounds to trigger empty redraw
      for ( var i = 0; i < this.photons.length; i++ ) {
        this.photons[i].location.x = 0;
      }
    }

  } );
} );
