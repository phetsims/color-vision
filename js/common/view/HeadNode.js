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

  // constants
  var BOTTOM_OFFSET = 15;

  /**
   * @param {Image} image the image to display for the head
   * @param {Number} layoutBoundsBottom should be layoutBounds.bottom so the HeadNode can align relative to that
   * @constructor
   */
  function HeadNode( image, layoutBoundsBottom ) {

    // HeadNode is just a wrapper around an image to ensure the correct positioning and scaling of all head images
    // in color vision. It is useful because we want the heads to look identical on both screens, and because the
    // RGB screen uses to overlapped head images to make sure the photons dissapear at the correct position,
    // and because we want the brain view and no brain view to line up precisely.
    Image.call( this, image,
      {
        // the head nodes all have the same bottom offset to ensure that the bottom of the head images align with
        // the bottom of the screen in a typical browser.
        bottom: layoutBoundsBottom + BOTTOM_OFFSET,
        left: 50,
        scale: 0.7
      } );
  }

  return inherit( Image, HeadNode );
} );
