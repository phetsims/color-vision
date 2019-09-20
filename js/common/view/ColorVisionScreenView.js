// Copyright 2014-2019, University of Colorado Boulder

/**
 * View components shared by both screens. Subclassed by SingleBulbScreenView and RGBScreenView.
 *
 * @author Aaron Davis
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const colorVision = require( 'COLOR_VISION/colorVision' );
  const inherit = require( 'PHET_CORE/inherit' );
  const PerceivedColorNode = require( 'COLOR_VISION/common/view/PerceivedColorNode' );
  const PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const StepForwardButton = require( 'SCENERY_PHET/buttons/StepForwardButton' );

  /**
   * @param {ColorVisionModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function ColorVisionScreenView( model, tandem ) {

    ScreenView.call( this, {
      layoutBounds: new Bounds2( 0, 0, 768, 504 ),
      tandem: tandem
    } );

    // 'Thought bubbles' that display perceived color
    const perceivedColorNode = new PerceivedColorNode( model.perceivedColorProperty, {
      left: 20,
      top: 5
    } );
    this.addChild( perceivedColorNode );

    // Play/pause button
    const playPauseButton = new PlayPauseButton( model.playingProperty, {
      bottom: this.layoutBounds.bottom - 20,
      centerX: this.layoutBounds.centerX - 25,
      radius: 20,
      tandem: tandem.createTandem( 'playPauseButton' )
    } );
    this.addChild( playPauseButton );

    // Step button
    const stepButton = new StepForwardButton( {
      isPlayingProperty: model.playingProperty,
      listener: function() { model.manualStep(); },
      centerY: playPauseButton.centerY,
      centerX: this.layoutBounds.centerX + 25,
      radius: 15,
      tandem: tandem.createTandem( 'stepButton' )
    } );
    this.addChild( stepButton );

    // Reset All button
    const resetAllButton = new ResetAllButton( {
      listener: function() { model.reset(); },
      bottom: this.layoutBounds.bottom - 5,
      right: this.layoutBounds.right - 30,
      radius: 18,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );
  }

  colorVision.register( 'ColorVisionScreenView', ColorVisionScreenView );

  return inherit( ScreenView, ColorVisionScreenView );
} );
