define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var HSlider = require( 'SUN/HSlider');
  var Rectangle = require( 'SCENERY/nodes/Rectangle');
  var LinearGradient = require( 'SCENERY/util/LinearGradient');
  var Dimension2 = require( 'DOT/Dimension2' );
  var Node = require( 'SCENERY/nodes/Node' );


  function ColorVisionSlider( model ) {

    Node.call( this );

    this.sliderValue = new Property( 0 );

    // var hSlider = new HSlider( model.redIntensityProperty, { min: 0, max: 100 },
    // from PropertySet in model

    var hSlider = new HSlider( this.sliderValue, { min: 0, max: 100 },
      {
        thumbSize: new Dimension2( 14, 28 ),
      } );
    hSlider.rotation = Math.PI / 2;

    var sliderGradient = new LinearGradient( 0, 0, 0, hSlider.height + 20 ).
      addColorStop( 0, 'red' ).
      addColorStop( 0.5, '#600000' ).
      addColorStop( 1, 'black' );

    var rectangle = new Rectangle( 700, 25, hSlider.width + 8, hSlider.height + 40, 5, 5, {
      fill: sliderGradient,
      stroke: '#c0b9b9'
    });
    hSlider.centerX = rectangle.centerX;
    hSlider.centerY = rectangle.centerY;

    rectangle.addChild( hSlider );

    this.addChild( rectangle );
  }

  return inherit( Node, ColorVisionSlider );
} );
