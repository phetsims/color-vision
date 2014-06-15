// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for ColorVisionEllipse objects (thought bubbles)
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Shape = require( 'KITE/Shape' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );

  /**
   * @param {PropertySet} model the model being used, either RGBModel or SingleBulbModel
   * @param {Number} centerX
   * @param {Number} centerY
   * @param {Number} yRadius
   * @constructor
   */
  function ColorVisionEllipse( model, centerX, centerY, yRadius ) {

    Node.call( this );

    var strokeColor = '#c0b9b9';
    var scaleFactor = 2.55;

    var ellipse = new Shape().ellipse( 0, 0, yRadius * 2, yRadius, 0 );
    var path = new Path( ellipse,
      {
        lineWidth: 0.5,
        stroke: strokeColor,
        centerX: centerX,
        centerY: centerY
      } );

    // if using RGB model
    if ( model.redIntensityProperty ) {
      // add listeners
      var rgbProperty = model.toDerivedProperty( ['perceivedRedIntensity', 'perceivedGreenIntensity', 'perceivedBlueIntensity'],
        function( redIntensity, greenIntensity, blueIntensity ) {
          return 'rgb(' + [
            Math.floor( redIntensity * scaleFactor ),
            Math.floor( greenIntensity * scaleFactor ),
            Math.floor( blueIntensity * scaleFactor ) ].join() + ')';
        } );

      rgbProperty.linkAttribute( path, 'fill' );

    }

    // if using singlebulb model
    else {
      model.perceivedColorProperty.linkAttribute( path, 'fill' );
    }

    this.addChild( path );
  }

  return inherit( Node, ColorVisionEllipse );
} );
