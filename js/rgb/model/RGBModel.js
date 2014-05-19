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

    this.redBeam = new PhotonBeam( '#ff0000', this.redIntensityProperty, this.perceivedRedIntensityProperty, 280 );
    this.greenBeam = new PhotonBeam( '#00ff00', this.greenIntensityProperty, this.perceivedGreenIntensityProperty, 240 );
    this.blueBeam = new PhotonBeam( '#0000ff', this.blueIntensityProperty, this.perceivedBlueIntensityProperty, 320 );

  }

  return inherit( PropertySet, RGBModel,
    {
      step: function( dt ) {
        this.redBeam.updateAnimationFrame();
        this.greenBeam.updateAnimationFrame();
        this.blueBeam.updateAnimationFrame();
      }
    } );
} );
