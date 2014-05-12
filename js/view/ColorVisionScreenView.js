define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Property = require( 'AXON/Property' );
  var HSlider = require( 'SUN/HSlider');
  var Rectangle = require( 'SCENERY/nodes/Rectangle');
  var LinearGradient = require( 'SCENERY/util/LinearGradient');

  // images
  var mockupImage = require( 'image!COLOR_VISION/mockup1.png' );

  function ColorVisionScreenView() {
    ScreenView.call( this );
    this.addChild( new Image( mockupImage, {
      centerX: ScreenView.DEFAULT_LAYOUT_BOUNDS.centerX,
      centerY: ScreenView.DEFAULT_LAYOUT_BOUNDS.centerY,
      scale: ScreenView.DEFAULT_LAYOUT_BOUNDS.height / mockupImage.height,
      opacity: 0.5
    } ) );

    this.sliderValue = new Property( 50 );

    // var vBox = new VBox( )

    var hSlider = new HSlider( this.sliderValue, { min: 0, max: 100 },
      {
        // thumbSize: new Dimension2( 15, 30 ),
        // rotation: Math.PI / 2,
        // majorTickLength: 15,
        // tickLabelSpacing: 2,

      } );
    hSlider.rotation = Math.PI / 2;

    var sliderGradient = new LinearGradient( 0, 0, 0, hSlider.height + 20 ).
      addColorStop( 0, 'red' ).
      addColorStop( 0.5, '#600000' ).
      addColorStop( 1, 'black' );

    var rectangle = new Rectangle( 700, 25, hSlider.width + 20, hSlider.height + 40, 5, 5, {
      fill: sliderGradient,
      stroke: '#c0b9b9'
    });
    hSlider.centerX = rectangle.centerX;
    hSlider.centerY = rectangle.centerY;

    this.addChild( rectangle );
    rectangle.addChild( hSlider );
  }

  return inherit( ScreenView, ColorVisionScreenView );
} );
