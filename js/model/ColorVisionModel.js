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
  var Property = require( 'AXON/Property' );

  function ColorVisionModel() {
    // model elements
    PropertySet.call( this, {
        redIntensity: 50,
        greenIntensity: 50,
        blueIntensity: 50
      }
    );
  }

  return inherit( PropertySet, ColorVisionModel );
} );
