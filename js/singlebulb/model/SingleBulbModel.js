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
  var VisibleColor = require( 'SCENERY_PHET/VisibleColor' );
  var Color = require( 'SCENERY/util/Color' );

  /**
   * @constructor
   */
  function SingleBulbModel() {
    PropertySet.call( this, {
        color: 'colored',          // takes values 'white' and 'colored', to indicate what kind of light in the beam
        beam: 'beam',              // takes values 'beam' and 'photon', to indicate solid beam vs individual photons
        flashlightWavelength: 570, // default wavelength is yellow color
        filterWavelength: 570,
        flashlightOn: true,
        filterVisible: true,
        running: true,
        play: true
      }
    );

    this.perceivedColorProperty = this.toDerivedProperty(
      [
        'flashlightWavelength',
        'filterWavelength',
        'flashlightOn',
        'filterVisible'
      ],
      function( flashlightWavelength, filterWavelength, flashlightOn, filterVisible ) {
        if ( !flashlightOn ) {
          return 'black';
        } else if ( filterVisible ) {

          var percent;
          var halfWidth = 25; // TODO: this needs to be factored out somewhere accessible to both this and the gaussian node. Should be half the number of wavelengths covered by the gaussian

          // If the flashlightWavelength is outside the transmission width, no color passes.
          if ( flashlightWavelength < filterWavelength - halfWidth || flashlightWavelength > filterWavelength + halfWidth ) {
            percent = 0;
          }
          // flashlightWavelength is within the transmission width, pass a linear percentage.
          else {
            percent = 100 - ( ( Math.abs( filterWavelength - flashlightWavelength ) / halfWidth ) * 100 );
          }
          var color = VisibleColor.wavelengthToColor( flashlightWavelength );
          var alpha = percent / 100;
          return new Color( color.r, color.g, color.b, alpha );
        } else {
          return VisibleColor.wavelengthToColor( flashlightWavelength );
        }
      } );
  }

  return inherit( PropertySet, SingleBulbModel,
    {
      step: function( dt ) {
      },

      reset: function() {
        PropertySet.prototype.reset.call( this );
      }

    } );
} );
