// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for ThoughtBubble objects (thought bubbles)
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
  var RGBModel = require( 'COLOR_VISION/rgb/model/RGBModel' );

  /**
   * @param {PropertySet} model the model being used, either RGBModel or SingleBulbModel
   * @param {Number} centerX
   * @param {Number} centerY
   * @param {Number} yRadius
   * @constructor
   */
    //TODO: Move centerX, centerY into options?
  function ThoughtBubble( model, centerX, centerY, yRadius ) {

    Node.call( this );

    // TODO: Document this color: is it gray?
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

    //If using the RGBModel link to a combination of the RGB colors
    //If using SingleBulbModel, it already has a perceived color property that should be used instead.
    var colorProperty = (model instanceof RGBModel) ?
                        model.toDerivedProperty( ['perceivedRedIntensity', 'perceivedGreenIntensity', 'perceivedBlueIntensity'],
                          function( redIntensity, greenIntensity, blueIntensity ) {
                            return 'rgb(' + [
                              Math.floor( redIntensity * scaleFactor ),
                              Math.floor( greenIntensity * scaleFactor ),
                              Math.floor( blueIntensity * scaleFactor ) ].join() + ')';
                          } ) :
                        model.perceivedColorProperty;

    colorProperty.linkAttribute( path, 'fill' );

    this.addChild( path );
  }

  return inherit( Node, ThoughtBubble );
} );