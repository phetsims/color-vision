// Copyright 2002-2013, University of Colorado Boulder

/**
 * FlashlightWithButtonNode - for navbar and homepage icons
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
  var flashlight = require ( 'image!COLOR_VISION/flashlight.png' );

  /**
   * @constructor
   */
  function FlashlightWithButtonNode( onOffProperty, options ) {

    Node.call( this );

    var flashlightImage = new Image( flashlight,
      {
        scale: 0.72
      } );

    var button = new BooleanRoundStickyToggleButton( onOffProperty,
      {
        centerY: flashlightImage.centerY + 2,
        centerX: flashlightImage.centerX + 15,
        baseColor: 'red',
        radius: 15
      } );

    this.addChild( flashlightImage );
    this.addChild( button );
    this.mutate( options );
  }

  return inherit( Node, FlashlightWithButtonNode );
} );
