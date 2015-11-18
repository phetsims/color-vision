// Copyright 2014-2015, University of Colorado Boulder

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
  var ColorVisionConstants = require( 'COLOR_VISION/ColorVisionConstants' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {String} color an rgb string
   * @param {Property<Number>} intensityProperty the intensity property for this color from the model
   * @param {Property<Number>} perceivedIntensityProperty the perceived intensity property for this color from the model
   * @param {Number} beamLength the length of the beam, used to calculate the starting x coordinate
   * @param {Tandem} tandem
   # @constructor
   */
  function RGBPhotonBeam( color, intensityProperty, perceivedIntensityProperty, beamLength, tandem ) {

    // @public
    this.photons = [];
    this.color = color;
    this.beamLength = beamLength;

    // @private
    this.intensityProperty = intensityProperty;
    this.perceivedIntensityProperty = perceivedIntensityProperty;

    tandem.createTandem( 'photons' ).addInstance( this.photons );
  }

  return inherit( PropertySet, RGBPhotonBeam, {

    // @public
    updateAnimationFrame: function( dt ) {

      // move all photons that are currently active
      for ( var i = 0; i < this.photons.length; i++ ) {

        // calculate the new location of the photon in order to check whether will still be in bounds
        var newX = this.photons[ i ].location.x + dt * this.photons[ i ].velocity.x;
        var newY = this.photons[ i ].location.y + dt * this.photons[ i ].velocity.y;

        if ( newX > 0 && newY > 0 && newY < ColorVisionConstants.BEAM_HEIGHT ) {
          this.photons[ i ].updateAnimationFrame( newX, newY );
        }
        else {
          this.perceivedIntensityProperty.set( this.photons[ i ].intensity );
          this.photons.splice( i, 1 ); // remove jth RGBPhoton from list
        }
      }

      // emit a black photon for resetting the perceived color to black if no more photons are emitted this frame
      if ( this.intensityProperty.get() === 0 ) {
        var blackPhoton = new RGBPhoton( new Vector2( this.beamLength, ColorVisionConstants.BEAM_HEIGHT / 2 ),
          new Vector2( ColorVisionConstants.X_VELOCITY, 0 ), 0 );
        this.photons.push( blackPhoton );
      }
    },

    // @public
    createPhoton: function( timeElapsed ) {
      var intensity = this.intensityProperty.get();

      // only create a new photon if intensity is greater than 0
      if ( intensity > 0 ) {
        var x = this.beamLength + ColorVisionConstants.X_VELOCITY * timeElapsed;
        var yVelocity = ( Math.random() * ColorVisionConstants.FAN_FACTOR - ( ColorVisionConstants.FAN_FACTOR / 2 ) ) * 60;

        var initialY = yVelocity * ( 25 / 60 ) + ( ColorVisionConstants.BEAM_HEIGHT / 2 );
        var deltaY = yVelocity * timeElapsed;
        var y = initialY + deltaY;

        this.photons.push( new RGBPhoton( new Vector2( x, y ), new Vector2( ColorVisionConstants.X_VELOCITY, yVelocity ), intensity ) );
      }
    },

    // @public
    reset: function() {
      // empty photon array
      while ( this.photons.length ) {
        this.photons.pop();
      }
    }

  } );
} );
