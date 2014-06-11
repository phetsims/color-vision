// Copyright 2002-2013, University of Colorado Boulder

/**
 * Shows the head/brain/eyeball for both screens.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Image = require( 'SCENERY/nodes/Image' );

  // images
  var headToggle = require( 'image!COLOR_VISION/color-vision-head-toggle.png' );

  /**
   * @param {Image} image the image to display for the head
   * @param {Number} bottom the bottom of the HeadNode (should be layoutBounds.bottom)
   * @constructor
   */
  function HeadNode( image, bottom ) {

    Image.call( this, image,
      {
        bottom: bottom,
        left: 50,
        scale: 0.7
      } );

    this.addChild( new Image( headToggle, { bottom: this.bottom + 35, x: this.x + 35, scale: 0.8 } ) );
  }

  return inherit( Image, HeadNode );
} );
