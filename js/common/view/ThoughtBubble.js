// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for ThoughtBubble objects
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Shape = require( 'KITE/Shape' );
  var Path = require( 'SCENERY/nodes/Path' );
  var RGBModel = require( 'COLOR_VISION/rgb/model/RGBModel' );

  // constants
  var COLOR_SCALE_FACTOR = 2.55; // for multiplying a percent by to get an rgb color intensity

  /**
   * @param {PropertySet} model the model being used, either RGBModel or SingleBulbModel
   * @param {Number} yRadius
   * @param {Object} options
   * @constructor
   */
  function ThoughtBubble( model, yRadius, options ) {

    var ellipse = new Shape().ellipse( 0, 0, yRadius * 2, yRadius, 0 );
    Path.call( this, ellipse,
      {
        lineWidth: 0.5,
        stroke: '#c0b9b9', // gray,
      } );

    // If using the RGBModel link to a combination of the RGB colors
    // If using SingleBulbModel, it already has a perceived color property that should be used instead.
    var colorProperty = ( model instanceof RGBModel ) ?
                        model.toDerivedProperty( ['perceivedRedIntensity', 'perceivedGreenIntensity', 'perceivedBlueIntensity'],
                          function( redIntensity, greenIntensity, blueIntensity ) {
                            return 'rgb(' + [
                              Math.floor( redIntensity * COLOR_SCALE_FACTOR ),
                              Math.floor( greenIntensity * COLOR_SCALE_FACTOR ),
                              Math.floor( blueIntensity * COLOR_SCALE_FACTOR ) ].join() + ')';
                          } ) :
                        model.perceivedColorProperty;

    colorProperty.linkAttribute( this, 'fill' );

    this.mutate( options );
  }

  return inherit( Path, ThoughtBubble );
} );