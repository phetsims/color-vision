// Copyright 2014-2015, University of Colorado Boulder

/**
 * FlashlightWithButtonNode - for Single Bulb Screen flashlight
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanRoundStickyToggleButton = require( 'SUN/buttons/BooleanRoundStickyToggleButton' );
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );

  // images
  var flashlightImage = require( 'image!COLOR_VISION/flashlight-0-deg.png' );

  /**
   * @param {Property.<boolean>} onProperty
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function FlashlightWithButtonNode( onProperty, tandem, options ) {

    Node.call( this );

    var flashlightNode = new Image( flashlightImage, { scale: 0.85 } );

    var button = new BooleanRoundStickyToggleButton( onProperty, {
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
