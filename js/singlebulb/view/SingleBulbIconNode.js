// Copyright 2002-2013, University of Colorado Boulder

/**
 * Photon beam
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // images
  var flashlight = require( 'image!COLOR_VISION/flashlight.png' );

  function RGBIconNode( width, height ) {

    Node.call( this );

    var rectangle = new Rectangle( 0, 0, 75, 50 );
    var flashlightScale = 0.12;
    var flashlightNode = new Image( flashlight, { scale: flashlightScale, centerX: rectangle.centerX, centerY: rectangle.centerY } );

    rectangle.addChild( flashlightNode );
    this.addChild( rectangle );

  }

  return inherit( Node, RGBIconNode );
} );
