// Copyright 2002-2013, University of Colorado Boulder

/**
 * HeadNode
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Image = require( 'SCENERY/nodes/Image' );

  //images
  var head = require( 'image!COLOR_VISION/color-vision-head.png' );

  /**
   * @param {Number} bottom the bottom of the HeadNode (should be layoutBounds.bottom)
   # @constructor
   */
  function HeadNode( image, bottom ) {

    Image.call( this, image,
      {
        bottom: bottom,
        left: 60,
        scale: 0.7
      } );

  }

  return inherit( Image, HeadNode );
} );
