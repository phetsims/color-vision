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
        redIntensity: 50,
        greenIntensity: 50,
        blueIntensity: 50
      }
    );

    // for testing only
    this.photon = new Photon( new Vector2( 300, 300 ), new Vector2( -1, -1 ), 0, new Color( 0, 255, 0) );

  }

  return inherit( PropertySet, ColorVisionModel,
    {
      step: function( dt ) {
        this.photon.updateAnimationFrame( dt );
      }
    } );
} );
