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
  var ObservableArray = require( 'AXON/ObservableArray');
  var Color = require( 'SCENERY/util/Color' );

  /**
   * @param {Color} color
   */
  function PhotonBeam( color ) {
    PropertySet.call( this, { color: color } );
    this.photons = new ObservableArray();
  }

  var updateAnimationFrame = function( dt ) {
    this.location = this.location.plus( this.velocity );
  };

  return inherit( PropertySet, PhotonBeam, { updateAnimationFrame: updateAnimationFrame } );
} );
