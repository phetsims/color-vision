// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model of a photon beam.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Vector2 = require( 'DOT/Vector2' );
  var Photon = require( 'COLOR_VISION/model/Photon' );

  /**
   * @param {Color} color
   */
  function PhotonBeam( color, intensityProperty ) {
    this.maxPhotons = 500;
    this.photons = [];      // for photons in use
    this.photonPool = [];   // for recycled photons

    this.color = color;
    this.intensityProperty = intensityProperty;

  }

  var updateAnimationFrame = function( dt ) {

    // create number of new photons proportional to intensity
    var numToCreate = Math.floor( 0.1 * parseInt( this.intensityProperty.value ) );
    // console.log( numToCreate );
    for ( var i = 0; i < numToCreate; i++ ) {

      if ( this.photonPool.length > 0 ) {
        var photon = this.photonPool.pop();
        photon.location.x = 220;
        this.photons.push( photon );

      } else if ( this.photons.length <= this.maxPhotons ) {
        this.photons.push( new Photon( new Vector2( 220, Math.floor( Math.random() * 50 ) ), new Vector2( -5, 0 ), 0, this.color ) );
      }

    }

    // move all photons that are currently active
    for ( var j = 0; j < this.photons.length; j++ ) {

      if ( this.photons[j].location.x > 0 ) {
        this.photons[j].updateAnimationFrame( dt );

      } else {
        this.photonPool.push( this.photons[j] );
        this.photons.splice( j, 1 );
      }

    }
  };

  return inherit( PropertySet, PhotonBeam, { updateAnimationFrame: updateAnimationFrame } );
} );
