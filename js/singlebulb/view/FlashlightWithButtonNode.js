// Copyright 2014-2019, University of Colorado Boulder

/**
 * FlashlightWithButtonNode - for Single Bulb Screen flashlight
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const BooleanRoundStickyToggleButton = require( 'SUN/buttons/BooleanRoundStickyToggleButton' );
  const colorVision = require( 'COLOR_VISION/colorVision' );
  const Image = require( 'SCENERY/nodes/Image' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );

  // images
  const flashlightImage = require( 'image!COLOR_VISION/flashlight-0-deg.png' );

  /**
   * @param {Property.<boolean>} onProperty
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function FlashlightWithButtonNode( onProperty, tandem, options ) {

    Node.call( this );

    const flashlightNode = new Image( flashlightImage, { scale: 0.85 } );

    const button = new BooleanRoundStickyToggleButton( onProperty, {
      centerY: flashlightNode.centerY,
      centerX: flashlightNode.centerX + 15,
      baseColor: 'red',
      radius: 15,
      tandem: tandem.createTandem( 'button' )
    } );

    this.addChild( flashlightNode );
    this.addChild( button );
    this.mutate( options );
  }

  colorVision.register( 'FlashlightWithButtonNode', FlashlightWithButtonNode );

  return inherit( Node, FlashlightWithButtonNode );
} );
