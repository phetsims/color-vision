// Copyright 2014-2017, University of Colorado Boulder

/**
 * View components shared by both screens. Subclassed by SingleBulbScreenView and RGBScreenView.
 *
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PerceivedColorNode = require( 'COLOR_VISION/common/view/PerceivedColorNode' );
  var PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var StepForwardButton = require( 'SCENERY_PHET/buttons/StepForwardButton' );

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
    var perceivedColorNode = new PerceivedColorNode( model.perceivedColorProperty, {
      left: 20,
      top: 5
    } );
    this.addChild( perceivedColorNode );

    // Play/pause button
    var playPauseButton = new PlayPauseButton( model.playingProperty, {
      bottom: this.layoutBounds.bottom - 20,
      centerX: this.layoutBounds.centerX - 25,
      radius: 20,
      tandem: tandem.createTandem( 'playPauseButton' )
    } );
    this.addChild( playPauseButton );

    // Step button
    var stepButton = new StepForwardButton( {
      isPlayingProperty: model.playingProperty,
      listener: function() { model.manualStep(); },
      centerY: playPauseButton.centerY,
      centerX: this.layoutBounds.centerX + 25,
      radius: 15,
      tandem: tandem.createTandem( 'stepButton' )
    } );
    this.addChild( stepButton );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
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
