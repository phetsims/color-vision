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
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var PlayPauseButton = require( 'SCENERY_PHET/PlayPauseButton' );
  var StepButton = require( 'SCENERY_PHET/StepButton' );
  var Color = require( 'SCENERY/util/Color' );
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

    // Add 'Reset All' button, resets the sim to its initial state
    var resetAllButton = new ResetAllButton(
      {
        listener: function() { model.reset(); },
        bottom: this.layoutBounds.bottom - 15,
        right: this.layoutBounds.right
      } );

    this.addChild( resetAllButton );

    // Add Play/Pause button
    var playPauseButton = new PlayPauseButton( model.redIntensityProperty,
      {
        baseColor: new Color( 247, 151, 34 ),
        bottom: this.layoutBounds.bottom - 5,
        centerX: this.layoutBounds.centerX - 32
      } );

    this.addChild( playPauseButton );

    // Add step button
    var stepButton = new StepButton( function( dt ) { console.log( dt ); }, model.redIntensityProperty,
      {
        baseColor: new Color( 247, 151, 34 ),
        bottom: this.layoutBounds.bottom - 12,
        centerX: this.layoutBounds.centerX + 32
      } );

    this.addChild( stepButton );
  }

  return inherit( ScreenView, RGBScreenView,
    {
      step: function( dt ) {

      }
    } );
} );
