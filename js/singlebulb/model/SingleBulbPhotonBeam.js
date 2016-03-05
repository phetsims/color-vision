// Copyright 2014-2015, University of Colorado Boulder

/**
 * Model of the photon beam used on the single bulb screen, made of individual photon particles.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var VisibleColor = require( 'SCENERY_PHET/VisibleColor' );
  var Color = require( 'SCENERY/util/Color' );
  var SingleBulbPhoton = require( 'COLOR_VISION/singlebulb/model/SingleBulbPhoton' );
  var ColorVisionConstants = require( 'COLOR_VISION/common/ColorVisionConstants' );
  var SingleBulbConstants = require( 'COLOR_VISION/singlebulb/SingleBulbConstants' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var BLACK_ALPHA_0 = Color.BLACK.withAlpha( 0 ).setImmutable();

  /**
   * @param {SingleBulbModel} model
   * @param {number} beamLength the length of the beam. This is used to determine what location to restart the photons.
   * @param {Tandem} tandem
   # @constructor
   */
  function SingleBulbPhotonBeam( model, beamLength, tandem ) {

    // @public
    this.photons = [];
    this.beamLength = beamLength;

    // @private
    this.model = model;

    tandem.createTandem( 'photons' ).addInstance( this.photons );
  }

  colorVision.register( 'SingleBulbPhotonBeam', SingleBulbPhotonBeam );

  function randomColor() {
    var r = Math.floor( Math.random() * 256 );
    var g = Math.floor( Math.random() * 256 );
    var b = Math.floor( Math.random() * 256 );
    return new Color( r, g, b, 1 );
  }

  return inherit( PropertySet, SingleBulbPhotonBeam, {

    // @public
    updateAnimationFrame: function( dt ) {

      var probability = 1; // probability for a given photon to pass the filter

      // move all photons that are currently active
      for ( var j = 0; j < this.photons.length; j++ ) {
        var photon = this.photons[ j ];

        // calculate the new location of the photon in order to check whether will still be in bounds
        var newX = photon.location.x + dt * photon.velocity.x;
        var newY = photon.location.y + dt * photon.velocity.y;

        // check if the photon just passed through the filter location
        if ( this.model.filterVisible && newX < this.filterOffset && !photon.passedFilter ) {
          var halfWidth = SingleBulbConstants.GAUSSIAN_WIDTH / 2;

          // If the photon's wavelength is outside the transmission width, it doesn't pass.
          if ( photon.wavelength < this.model.filterWavelength - halfWidth ||
               photon.wavelength > this.model.filterWavelength + halfWidth ) {
            probability = 0;
          }
          // flashlightWavelength is within the transmission width, pass a linear percentage.
          else {
            probability = 1 - Math.abs( this.model.filterWavelength - photon.wavelength ) / halfWidth;
          }

          // set the probability to be 0.5 for white photons, this is just based on the observation of what looks good
          probability = ( !photon.wasWhite ) ? probability : 0.5;

          // remove a percentage of photons from the beam
          if ( Math.random() >= probability ) {
            this.photons.splice( j, 1 ); // remove jth photon from list
            continue;
          }
          // if the beam is white, make sure it is the color of the filter
          else if ( photon.isWhite ) {
            photon.color = VisibleColor.wavelengthToColor( this.model.filterWavelength );
            photon.isWhite = false;
          }
          // if the photon is not white
          else {

            // set the photonIntensity to be the same as the percentage passing through the filter,
            // for use when setting the perceived color when the photon hits the eye.
            // make sure the intensity is at least 0.2, otherwise it looks too black in the view
            photon.intensity = isFinite( probability ) ? ( ( probability < 0.2 ) ? 0.2 : probability ) : 0;
          }
        }

        // keep track of photons which pass the filter
        if ( photon.location.x < this.filterOffset ) {
          photon.passedFilter = true;
        }

        // move the photon unless it goes out of bounds
        if ( newX > 0 && newY > 0 && newY < ColorVisionConstants.BEAM_HEIGHT ) {
          photon.updateAnimationFrame( newX, newY );
        }

        // if the photon goes out of bounds, update the lastPhotonColor property, which is used in determining the perceived color
        else {
          var newPerceivedColor = ( photon.isWhite ) ? Color.WHITE : photon.color.withAlpha( photon.intensity );

          // don't update the lastPhotonColor unless it is different than before, for performance reasons
          // and don't bother to update the color if the view is on beam mode
          if ( !this.model.lastPhotonColor.equals( newPerceivedColor ) && this.model.beamType === 'photon' ) {

            // if the photon was white, the perceived color keeps full intensity even when it passes the filter,
            // otherwise it takes the intensity of the photon, which may have been partially filtered
            this.model.lastPhotonColor = ( photon.wasWhite ) ? newPerceivedColor.withAlpha( 1 ) : newPerceivedColor;
          }
          this.photons.splice( j, 1 ); // remove jth photon from list
        }
      }

      // emit a black photon for resetting the perceived color to black if no more photons passing through the filter.
      // this takes care of the case when no photons pass through the filter
      if ( probability === 0 && this.model.filterVisible ) {
        var blackPhoton = new SingleBulbPhoton( new Vector2( this.filterOffset, ColorVisionConstants.BEAM_HEIGHT / 2 ),
          new Vector2( ColorVisionConstants.X_VELOCITY, 0 ), 1, BLACK_ALPHA_0, false );
        blackPhoton.passedFilter = true;
        this.photons.push( blackPhoton );
      }

      // emit a black photon for resetting the perceived color to black if the flashlight is off
      if ( !this.model.flashlightOn ) {
        this.photons.push( new SingleBulbPhoton( new Vector2( this.beamLength, ColorVisionConstants.BEAM_HEIGHT / 2 ),
          new Vector2( ColorVisionConstants.X_VELOCITY, 0 ), 1, BLACK_ALPHA_0, false ) );
      }
    },

    // @public
    createPhoton: function( timeElapsed ) {
      // if the flashlight is on, create a new photon this animation frame
      if ( this.model.flashlightOn ) {
        var newColor = ( this.model.lightType === 'white' ) ? randomColor() : VisibleColor.wavelengthToColor( this.model.flashlightWavelength );

        var x = this.beamLength + ColorVisionConstants.X_VELOCITY * timeElapsed;
        var yVelocity = ( Math.random() * ColorVisionConstants.FAN_FACTOR - ( ColorVisionConstants.FAN_FACTOR / 2 ) ) * 60;

        var initialY = yVelocity * ( 25 / 60 ) + ( ColorVisionConstants.BEAM_HEIGHT / 2 );
        var deltaY = yVelocity * timeElapsed;
        var y = initialY + deltaY;

        this.photons.push( new SingleBulbPhoton( new Vector2( x, y ),
          new Vector2( ColorVisionConstants.X_VELOCITY, yVelocity ),
          1, newColor, ( this.model.lightType === 'white' ),
          this.model.flashlightWavelength ) );
      }
    },

    // @public
    reset: function() {
      // set all photons to be out of bounds to trigger empty redraw
      for ( var i = 0; i < this.photons.length; i++ ) {
        this.photons[ i ].location.x = 0;
      }
    }

  } );
} );
