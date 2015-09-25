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

  return inherit( Node, FlashlightWithButtonNode );
} );
