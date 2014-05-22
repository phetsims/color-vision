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
  var Image = require( 'SCENERY/nodes/Image' );
  var ResetAllButton = require( 'SCENERY_PHET/ResetAllButton' );
  var PlayPauseButton = require( 'SCENERY_PHET/PlayPauseButton' );
  var StepButton = require( 'SCENERY_PHET/StepButton' );
  var RectangularStickyToggleButton = require( 'SUN/buttons/RectangularStickyToggleButton' );
  var InOutRadioButton = require( 'SUN/InOutRadioButton' );
  var Color = require( 'SCENERY/util/Color' );
  var HeadNode = require( 'COLOR_VISION/common/view/HeadNode' );
  var ColorVisionEllipse = require( 'COLOR_VISION/rgb/view/ColorVisionEllipse' );
  var FlashlightWithButtonNode = require( 'COLOR_VISION/singlebulb/view/FlashlightWithButtonNode' );

  var Property = require( 'AXON/Property' );

  // images
  var headFront = require ( 'image!COLOR_VISION/head-front.png' );
  var headBack = require ( 'image!COLOR_VISION/head.png' );
  var whiteLightIcon = require ( 'image!COLOR_VISION/color-vision-white-light-icon.png' );
  var singleColorLightIcon = require ( 'image!COLOR_VISION/color-vision-single-color-light-icon.png' );
  var beamViewIcon = require ( 'image!COLOR_VISION/color-vision-beam-view-icon.png' );
  var photonViewIcon = require ( 'image!COLOR_VISION/color-vision-photon-view-icon.png' );

  /**
   * @constructor
   */
  function RGBScreenView( model ) {

    ScreenView.call( this, { renderer: 'svg' } );

    // Add thought bubbles
    this.addChild( new ColorVisionEllipse( model, 225, 60, 53 ) );
    this.addChild( new ColorVisionEllipse( model, 90, 105, 15 ) );
    this.addChild( new ColorVisionEllipse( model, 62, 165, 12 ) );
    this.addChild( new ColorVisionEllipse( model, 50, 220,  7 ) );

    // Add head image
    this.addChild( new HeadNode( headBack, this.layoutBounds.bottom + 15 ) );

    // Add flashlight
    var flashlightNode = new FlashlightWithButtonNode( model.redIntensityProperty,
      {
        centerY: this.layoutBounds.centerY + 10,
        right: this.layoutBounds.maxX
      } );
    this.addChild( flashlightNode );

    var colorProperty = new Property('white')

    // Add buttons
    var whiteLightButton = new RectangularStickyToggleButton( 'white', 'colored', colorProperty,
      {
        content: new Image( whiteLightIcon ),
        scale: 0.8,
        left: flashlightNode.left + 10,
        bottom: flashlightNode.top - 15
      } );

    this.addChild( whiteLightButton );

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
