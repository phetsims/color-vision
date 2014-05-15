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
  var Vector2 = require( 'DOT/Vector2' );
  var Color = require( 'SCENERY/util/Color' );
  var PhotonBeam = require( 'COLOR_VISION/model/PhotonBeam' );

  function ColorVisionModel() {
    // model elements
    PropertySet.call( this, {
        redIntensity: 0,
        greenIntensity: 0,
        blueIntensity: 0
      }
    );

    this.redBeam = new PhotonBeam( '#ff0000', this.redIntensityProperty );
    this.greenBeam = new PhotonBeam( '#00ff00', this.greenIntensityProperty );
    this.blueBeam = new PhotonBeam( '#0000ff', this.blueIntensityProperty );

  }

  return inherit( PropertySet, ColorVisionModel,
    {
      step: function( dt ) {
        this.redBeam.updateAnimationFrame();
        this.greenBeam.updateAnimationFrame();
        this.blueBeam.updateAnimationFrame();
      }
    } );
} );
