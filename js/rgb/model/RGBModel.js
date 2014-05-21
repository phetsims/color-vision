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

  function RGBModel() {
    // model elements
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
        this.redIntensityProperty.value = 0;
        this.greenIntensityProperty.value = 0;
        this.blueIntensityProperty.value = 0;
        this.perceivedRedIntensityProperty.value = 0;
        this.perceivedGreenIntensityProperty.value = 0;
        this.perceivedBlueIntensityProperty.value = 0;

        this.redBeam.reset();
        this.greenBeam.reset();
        this.blueBeam.reset();
      }

    } );
} );
