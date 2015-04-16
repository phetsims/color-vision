// Copyright 2002-2014, University of Colorado Boulder

/**
 * FlashlightWithButtonNode - for Single Bulb Screen flashlight
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var BooleanRoundStickyToggleButton = require( 'SUN/buttons/BooleanRoundStickyToggleButton' );

  // images
  var flashlightImage = require( 'image!COLOR_VISION/flashlight-0-deg.png' );

  /**
   * @constructor
   */
  function FlashlightWithButtonNode( onProperty, options ) {

    Node.call( this );

    var flashlightNode = new Image( flashlightImage, { scale: 0.85 } );

    var button = new BooleanRoundStickyToggleButton( onProperty,
      {
        centerY: flashlightNode.centerY,
        centerX: flashlightNode.centerX + 15,
        baseColor: 'red',
        radius: 15
      } );

    this.addChild( flashlightNode );
    this.addChild( button );
    this.mutate( options );

    // Together support
    together && together.addComponent( button, 'singleBulbScreen.flashlightButton' );
  }

  return inherit( Node, FlashlightWithButtonNode );
} );
