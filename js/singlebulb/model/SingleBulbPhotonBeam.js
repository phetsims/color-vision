// Copyright 2014-2020, University of Colorado Boulder

/**
 * Model of the photon beam used on the single bulb screen, made of individual photon particles.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const Color = require( 'SCENERY/util/Color' );
  const colorVision = require( 'COLOR_VISION/colorVision' );
  const ColorVisionConstants = require( 'COLOR_VISION/common/ColorVisionConstants' );
  const Emitter = require( 'AXON/Emitter' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const PhetioObject = require( 'TANDEM/PhetioObject' );
  const SingleBulbConstants = require( 'COLOR_VISION/singlebulb/SingleBulbConstants' );
  const SingleBulbPhoton = require( 'COLOR_VISION/singlebulb/model/SingleBulbPhoton' );
  const SingleBulbPhotonBeamIO = require( 'COLOR_VISION/singlebulb/model/SingleBulbPhotonBeamIO' );
  const Vector2 = require( 'DOT/Vector2' );
  const VisibleColor = require( 'SCENERY_PHET/VisibleColor' );

  // constants
  const BLACK_ALPHA_0 = Color.BLACK.withAlpha( 0 ).setImmutable();

  // TODO: Should the required options be renamed to 'config'?
  /**
   * @param {SingleBulbModel} model
   * @param {number} beamLength the length of the beam. This is used to determine what location to restart the photons.
   * @param {Object} [options] - required
   * @constructor
   */
  function SingleBulbPhotonBeam( model, beamLength, options ) {

    options = merge( {
      phetioType: SingleBulbPhotonBeamIO,
      phetioState: false
    }, options );

    PhetioObject.call( this, options );

    // @public
    this.photons = [];
    this.beamLength = beamLength;

    // @private
    this.model = model;

    // @public
    this.photonGroupTandem = options.tandem.createGroupTandem( 'photons' );

    // @public
    this.repaintEmitter = new Emitter();
  }

  colorVision.register( 'SingleBulbPhotonBeam', SingleBulbPhotonBeam );

  function randomColor() {
    const r = Math.floor( phet.joist.random.nextDouble() * 256 );
    const g = Math.floor( phet.joist.random.nextDouble() * 256 );
    const b = Math.floor( phet.joist.random.nextDouble() * 256 );
    return new Color( r, g, b, 1 );
  }

  return inherit( PhetioObject, SingleBulbPhotonBeam, {

    // @public
    updateAnimationFrame: function( dt ) {

      const self = this;

      let probability = 1; // probability for a given photon to pass the filter
      const filterWavelength = this.model.filterWavelengthProperty.value;

      // move all photons that are currently active
      for ( let j = 0; j < this.photons.length; j++ ) {
        const photon = this.photons[ j ];

        // calculate the new location of the photon in order to check whether will still be in bounds
        const newX = photon.location.x + dt * photon.velocity.x;
        const newY = photon.location.y + dt * photon.velocity.y;

        // check if the photon just passed through the filter location
        if ( this.model.filterVisibleProperty.value && newX < this.filterOffset && !photon.passedFilter ) {
          const halfWidth = SingleBulbConstants.GAUSSIAN_WIDTH / 2;

          // If the photon's wavelength is outside the transmission width, it doesn't pass.
          if ( photon.wavelength < filterWavelength - halfWidth ||
               photon.wavelength > filterWavelength + halfWidth ) {
            probability = 0;
          }
          // flashlightWavelength is within the transmission width, pass a linear percentage.
          else {
            probability = 1 - Math.abs( filterWavelength - photon.wavelength ) / halfWidth;
          }

          // set the probability to be 0.5 for white photons, this is just based on the observation of what looks good
          probability = ( !photon.wasWhite ) ? probability : 0.5;

          // remove a percentage of photons from the beam
          if ( phet.joist.random.nextDouble() >= probability ) {
            this.photons[ j ].dispose();
            this.photons.splice( j, 1 ); // remove jth photon from list
            continue;
          }
          // if the beam is white, make sure it is the color of the filter
          else if ( photon.isWhite ) {
            photon.color = VisibleColor.wavelengthToColor( filterWavelength );
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
          const newPerceivedColor = ( photon.isWhite ) ? Color.WHITE : photon.color.withAlpha( photon.intensity );

          // don't update the lastPhotonColor unless it is different than before, for performance reasons
          // and don't bother to update the color if the view is on beam mode
          if ( !this.model.lastPhotonColorProperty.value.equals( newPerceivedColor ) && this.model.beamTypeProperty.value === 'photon' ) {

            // if the photon was white, the perceived color keeps full intensity even when it passes the filter,
            // otherwise it takes the intensity of the photon, which may have been partially filtered
            this.model.lastPhotonColorProperty.value = ( photon.wasWhite ) ? newPerceivedColor.withAlpha( 1 ) : newPerceivedColor;
          }

          this.photons[ j ].dispose();
          this.photons.splice( j, 1 ); // remove jth photon from list
        }
      }

      // emit a black photon for resetting the perceived color to black if no more photons passing through the filter.
      // this takes care of the case when no photons pass through the filter
      if ( probability === 0 && this.model.filterVisibleProperty.value ) {
        const blackPhoton = new SingleBulbPhoton(
          new Vector2( this.filterOffset, ColorVisionConstants.BEAM_HEIGHT / 2 ),
          new Vector2( ColorVisionConstants.X_VELOCITY, 0 ),
          1,
          BLACK_ALPHA_0,
          false,
          undefined, {
            tandem: self.photonGroupTandem.createNextTandem()
          }
        );
        blackPhoton.passedFilter = true;
        this.photons.push( blackPhoton );
      }

      // emit a black photon for resetting the perceived color to black if the flashlight is off
      if ( !this.model.flashlightOnProperty.value ) {
        this.photons.push( new SingleBulbPhoton(
          new Vector2( this.beamLength, ColorVisionConstants.BEAM_HEIGHT / 2 ),
          new Vector2( ColorVisionConstants.X_VELOCITY, 0 ),
          1,
          BLACK_ALPHA_0,
          false,
          undefined, {// TODO: quoi?
            tandem: self.photonGroupTandem.createNextTandem()
          }
        ) );
      }
    },

    // @public
    createPhoton: function( timeElapsed ) {
      const self = this;
      // if the flashlight is on, create a new photon this animation frame
      if ( this.model.flashlightOnProperty.value ) {
        const newColor = ( this.model.lightTypeProperty.value === 'white' ) ?
                       randomColor() : VisibleColor.wavelengthToColor( this.model.flashlightWavelengthProperty.value );

        const x = this.beamLength + ColorVisionConstants.X_VELOCITY * timeElapsed;
        const yVelocity = ( phet.joist.random.nextDouble() * ColorVisionConstants.FAN_FACTOR - ( ColorVisionConstants.FAN_FACTOR / 2 ) ) * 60;

        const initialY = yVelocity * ( 25 / 60 ) + ( ColorVisionConstants.BEAM_HEIGHT / 2 );
        const deltaY = yVelocity * timeElapsed;
        const y = initialY + deltaY;

        this.photons.push( new SingleBulbPhoton(
          new Vector2( x, y ),
          new Vector2( ColorVisionConstants.X_VELOCITY, yVelocity ),
          1,
          newColor,
          this.model.lightTypeProperty.value === 'white',
          this.model.flashlightWavelengthProperty.value, {
            tandem: self.photonGroupTandem.createNextTandem()
          }
        ) );
      }
    },

    // @public
    reset: function() {
      // set all photons to be out of bounds to trigger empty redraw
      for ( let i = 0; i < this.photons.length; i++ ) {
        this.photons[ i ].location.x = 0;
      }
    }
  } );
} );