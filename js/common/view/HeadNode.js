// Copyright 2002-2013, University of Colorado Boulder

/**
 * Shows the head image, positioned and scaled correctly for both screens
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Image = require( 'SCENERY/nodes/Image' );

  /**
   * @param {Image} image the image to display for the head
   * @param {Number} bottom the bottom of the HeadNode (should be layoutBounds.bottom)
   * @constructor
   */
  function HeadNode( image, bottom ) {

    Image.call( this, image,
      {
        bottom: bottom + 15,
        left: 50,
        scale: 0.7
      } );
  }

  return inherit( Image, HeadNode );
} );
