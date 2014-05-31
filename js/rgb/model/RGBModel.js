// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model for ColorVision sim
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var PhotonBeam = require( 'COLOR_VISION/rgb/model/PhotonBeam' );
  var Constants = require( 'COLOR_VISION/ColorVisionConstants' );

  /**
   * @constructor
   */
  function RGBModel() {

    /**
     * RGGModel contains 6 intensity properties, all of which range between 0-100.
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
        perceivedBlueIntensity: 0
      }
    );

    this.redBeam = new PhotonBeam( '#ff0000', this.redIntensityProperty, this.perceivedRedIntensityProperty, Constants.RED_BEAM_LENGTH );
    this.greenBeam = new PhotonBeam( '#00ff00', this.greenIntensityProperty, this.perceivedGreenIntensityProperty, Constants.GREEN_BEAM_LENGTH );
    this.blueBeam = new PhotonBeam( '#0000ff', this.blueIntensityProperty, this.perceivedBlueIntensityProperty, Constants.BLUE_BEAM_LENGTH );

  }

  return inherit( PropertySet, RGBModel,
    {
      step: function( dt ) {
        this.redBeam.updateAnimationFrame( dt );
        this.greenBeam.updateAnimationFrame( dt );
        this.blueBeam.updateAnimationFrame( dt );
      },

      reset: function() {
        PropertySet.prototype.reset.call( this );

        this.redBeam.reset();
        this.greenBeam.reset();
        this.blueBeam.reset();
      }

    } );
} );
