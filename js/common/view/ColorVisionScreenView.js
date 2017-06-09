// Copyright 2014-2015, University of Colorado Boulder

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
  var ScreenView = require( 'JOIST/ScreenView' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  var StepForwardButton = require( 'SCENERY_PHET/buttons/StepForwardButton' );
  var ThoughtBubble = require( 'COLOR_VISION/common/view/ThoughtBubble' );

  // constants
  // used for moving the thought bubbles together as a group in case minor adjustments are needed
  var THOUGHT_BUBBLE_X = -15;
  var THOUGHT_BUBBLE_Y = -10;

  /**
   * @param {ColorVisionModel} model
   * @param {Object} options
   * @param {Tandem} tandem
   * @constructor
   */
  function ColorVisionScreenView( model, tandem, options ) {

    ScreenView.call( this, { layoutBounds: new Bounds2( 0, 0, 768, 504 ) } );

    // Add thought bubbles
    this.addChild( new ThoughtBubble( model.perceivedColorProperty, 45, {
      centerX: 220 + THOUGHT_BUBBLE_X,
      centerY: 60 + THOUGHT_BUBBLE_Y
    } ) );
    this.addChild( new ThoughtBubble( model.perceivedColorProperty, 15, {
      centerX: 90 + THOUGHT_BUBBLE_X,
      centerY: 105 + THOUGHT_BUBBLE_Y
    } ) );
    this.addChild( new ThoughtBubble( model.perceivedColorProperty, 12, {
      centerX: 62 + THOUGHT_BUBBLE_X,
      centerY: 165 + THOUGHT_BUBBLE_Y
    } ) );
    this.addChild( new ThoughtBubble( model.perceivedColorProperty, 7, {
      centerX: 50 + THOUGHT_BUBBLE_X,
      centerY: 220 + THOUGHT_BUBBLE_Y
    } ) );

    // Add reset all button
    var resetAllButton = new ResetAllButton( {
      listener: function() { model.reset(); },
      bottom: this.layoutBounds.bottom - 5,
      right: this.layoutBounds.right - 30,
      radius: 18,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );

    this.addChild( resetAllButton );

    // Add play/pause button
    var playPauseButton = new PlayPauseButton( model.playingProperty, {
      bottom: this.layoutBounds.bottom - 20,
      centerX: this.layoutBounds.centerX - 25,
      radius: 20,
      tandem: tandem.createTandem( 'playPauseButton' )
    } );

    this.addChild( playPauseButton );

    // Add step button
    var stepButton = new StepForwardButton( {
      playingProperty: model.playingProperty,
      listener: function() { model.manualStep(); },
      centerY: playPauseButton.centerY,
      centerX: this.layoutBounds.centerX + 25,
      radius: 15,
      tandem: tandem.createTandem( 'stepButton' )
    } );

    this.addChild( stepButton );
  }

  colorVision.register( 'ColorVisionScreenView', ColorVisionScreenView );

  return inherit( ScreenView, ColorVisionScreenView );
} );
