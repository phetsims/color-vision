// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for RGB screen
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var RGBPhotonBeam = require( 'COLOR_VISION/rgb/model/RGBPhotonBeam' );
  var Constants = require( 'COLOR_VISION/ColorVisionConstants' );
  var RGBConstants = require( 'COLOR_VISION/rgb/RGBConstants' );

  /**
   * @constructor
   */
  function RGBModel() {

    /**
     * RGBModel contains 6 intensity properties, all of which range between 0-100.
     *
     * The values of the properties redIntensity, greenIntensity, and blueIntensity are determined
     * from the sliders, and indicate the density of the photons coming out of the flashlights.
     *
     * The perceivedIntensity properties determine the color of the thought
     * bubbles. They are calculated by taking the intensity value of the most recent photon to
     * reach the end of the photon beam (the person's eye). Each photon keeps a record of the
     * intensity for this reason, even though it is not used in determining intensity of the
     * photon itself, which is constant.
     */
    PropertySet.call( this, {
        redIntensity: 0,
        greenIntensity: 0,
        blueIntensity: 0,
        perceivedRedIntensity: 0,
        perceivedGreenIntensity: 0,
        perceivedBlueIntensity: 0,
        play: true,
        headMode: 'brain' // takes values 'brain' or 'no-brain'
      }
    );

    this.redBeam = new RGBPhotonBeam( '#ff0000', this.redIntensityProperty, this.perceivedRedIntensityProperty, RGBConstants.RED_BEAM_LENGTH );
    this.greenBeam = new RGBPhotonBeam( '#00ff00', this.greenIntensityProperty, this.perceivedGreenIntensityProperty, RGBConstants.GREEN_BEAM_LENGTH );
    this.blueBeam = new RGBPhotonBeam( '#0000ff', this.blueIntensityProperty, this.perceivedBlueIntensityProperty, RGBConstants.BLUE_BEAM_LENGTH );

  }

  return inherit( PropertySet, RGBModel,
    {
      step: function( dt ) {
        if ( this.play ) {
          if ( dt > Constants.MAX_DT || dt <= 0 ) {
            dt = 1.0 / 60.0;
          }
          this.redBeam.updateAnimationFrame( dt );
          this.greenBeam.updateAnimationFrame( dt );
          this.blueBeam.updateAnimationFrame( dt );
        }
      },

      // step one frame, assuming 60fps
      manualStep: function() {
        this.redBeam.updateAnimationFrame( 1 / 60 );
        this.greenBeam.updateAnimationFrame( 1 / 60 );
        this.blueBeam.updateAnimationFrame( 1 / 60 );
      },

      reset: function() {
        PropertySet.prototype.reset.call( this );

        this.redBeam.reset();
        this.greenBeam.reset();
        this.blueBeam.reset();
      }

    } );
} );
