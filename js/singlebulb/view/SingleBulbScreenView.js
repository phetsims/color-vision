// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for the first ColorVision screen
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var HeadNode = require( 'COLOR_VISION/common/view/HeadNode' );
  var ColorVisionEllipse = require( 'COLOR_VISION/rgb/view/ColorVisionEllipse' );

  function RGBScreenView( model ) {

    ScreenView.call( this, { renderer: 'svg' } );

    // Add thought bubbles
    this.addChild( new ColorVisionEllipse( model, 225, 60, 53 ) );
    this.addChild( new ColorVisionEllipse( model, 90, 105, 15 ) );
    this.addChild( new ColorVisionEllipse( model, 62, 165, 12 ) );
    this.addChild( new ColorVisionEllipse( model, 50, 220,  7 ) );

    // Add head image
    this.addChild( new HeadNode( this.layoutBounds.bottom ) );
  }

  return inherit( ScreenView, RGBScreenView,
    {
      step: function( dt ) {

      }
    } );
} );
