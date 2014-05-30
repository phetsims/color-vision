// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model of a photon beam, made of individual photon particles.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var VisibleColor = require( 'SCENERY_PHET/VisibleColor' );
  var Color = require( 'SCENERY/util/Color' );
  var Photon = require( 'COLOR_VISION/rgb/model/Photon' );
  var Constants = require( 'COLOR_VISION/ColorVisionConstants' );

  /**
   * @param {SingleBulbModel} model
   * @param {Number} size the length of the beam
   # @constructor
   */
  function SingleBulbPhotonBeam( model, size ) {
    this.photons = [];
    this.size = size;

    this.flashlightWavelength = model.flashlightWavelengthProperty;
    this.filterWavelength = model.filterWavelengthProperty;
    this.filterVisible = model.filterVisibleProperty;
    this.flashlightOn = model.flashlightOnProperty;
    this.light = model.lightProperty;
    this.perceivedColor = model.perceivedColorProperty;
  }

  var updateAnimationFrame = function( dt ) {

    function randomColor() {
      var r = Math.floor( Math.random() * 256 );
      var g = Math.floor( Math.random() * 256 );
      var b = Math.floor( Math.random() * 256 );
      return new Color( r, g, b, 1 );
    }

    var newColor;
    for ( var i = 0; i < 5; i++ ) {
      if ( this.light.value === 'white' ) {
        newColor = randomColor();
      } else {
        newColor = VisibleColor.wavelengthToColor( this.flashlightWavelength.value );
      }
      this.photons.push( Photon.createFromPool( this.size, newColor ) );
    }

    // move all photons that are currently active
    for ( var j = 0; j < this.photons.length; j++ ) {

      if ( this.photons[j].location.x > 0 && this.photons[j].location.y > 0 && this.photons[j].location.y < Constants.BEAM_HEIGHT ) {
        this.photons[j].updateAnimationFrame( dt );

      } else {
        this.photons[j].freeToPool();
        this.photons.splice( j, 1 ); // remove jth photon from list
      }

    }

  };

  var reset = function() {
    // set all photons to be out of bounds to trigger empty redraw
    for ( var i = 0; i < this.photons.length; i++ ) {
      this.photons[i].location.x = 0;
    }
  };

  return inherit( PropertySet, SingleBulbPhotonBeam, { updateAnimationFrame: updateAnimationFrame, reset: reset } );
} );
