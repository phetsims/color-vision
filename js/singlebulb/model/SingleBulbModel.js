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

  /**
   * @constructor
   */
  function SingleBulbModel() {
    PropertySet.call( this, {
        color: 'white',            // takes values 'white' and 'colored'
        beam: 'beam',              // takes values 'beam' and 'photon'
        flashlightWavelength: 570, // default wavelength is yellow color
        filterWavelength: 570,
        flashlightOn: true,
        filterOn: true,
        running: true,
        play: true
      }
    );
  }

  return inherit( PropertySet, SingleBulbModel,
    {
      step: function( dt ) {
      },

      reset: function() {
        // PropertySet.prototype.reset.call( this );
      }

    } );
} );
