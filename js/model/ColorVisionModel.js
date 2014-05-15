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
  var Photon = require( 'COLOR_VISION/model/Photon' );

  function ColorVisionModel() {
    // model elements
    PropertySet.call( this, {
        redIntensity: 0,
        greenIntensity: 0,
        blueIntensity: 0
      }
    );

    this.maxPhotons = 500;
    this.photons = [];      // for photons in use
    this.photonPool = [];   // for recycled photons

  }

  return inherit( PropertySet, ColorVisionModel,
    {
      step: function( dt ) {
        var numToCreate = Math.floor( 0.1 * this.greenIntensity );
        for ( var j = 0; j < numToCreate; j++ ) {
          if ( this.photonPool.length > 0 ) {
            var photon = this.photonPool.pop();
            photon.location.x = 220;
            this.photons.push( photon );
          } else if ( this.photons.length <= this.maxPhotons ) {
            this.photons.push( new Photon( new Vector2( 220, Math.floor( Math.random() * 50 ) ), new Vector2( -5, 0 ), 0, '#00ff00' ) );
          }
        }
        for ( var i = 0; i < this.photons.length; i++ ) {
          if ( this.photons[i].location.x > 0 ) {
            this.photons[i].updateAnimationFrame( dt );
          } else {
            this.photonPool.push( this.photons[i] );
            this.photons.splice( i, 1 );
          }
        }
      }
    } );
} );
