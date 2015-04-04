// Copyright 2002-2014, University of Colorado Boulder

/**
 * HeadNode for both screens.
 * This node has two layers of heads. The back layer is the full head image, and the front layer has the nose
 * cut out, and in between are the photon beams. This is because we want the photons to get cut off at a particular
 * place, and this was easiest to accomplish with layering, as opposed to shaping the end of the photon beams.
 * This is technically not necessary in single bulb mode because there is only one beam and it isn't at an angle, but
 * it still uses this node for consistency and simplicity, it just doesn't pass the beams to layer in.
 *
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var ColorVisionConstants = require( 'COLOR_VISION/ColorVisionConstants' );

  // images
  var silhouetteImage = require( 'image!COLOR_VISION/silhouette.png' );
  var headImage = require( 'image!COLOR_VISION/head.png' );

  var silhouetteFrontImage = require( 'image!COLOR_VISION/silhouette-front.png' );
  var headFrontImage = require( 'image!COLOR_VISION/head-front.png' );

  var headIcon = require( 'image!COLOR_VISION/silhouette-icon.png' );
  var silhouetteIcon = require( 'image!COLOR_VISION/head-icon.png' );

  // constants
  var BOTTOM_OFFSET = 15;
  var SCALE = 0.96;
  var IMAGE_SCALE = 0.6;

  /**
   * @param {Property<String>} headModeProperty
   * @param {Number} layoutBoundsBottom should be layoutBounds.bottom so the HeadNode can align relative to that
   * @param {Array<RGBPhotonBeamNode>} photonBeams for layering properly, only used in RGBScreenView
   * @param {object} [options]
   * @constructor
   */
  function HeadNode( headModeProperty, layoutBoundsBottom, photonBeams, options ) {

    Node.call( this );
    options = _.extend( {
      hideBrainRadioButtonComponentID: null,
      showBrainRadioButtonComponentID: null
    }, options );

    var silhouetteOptions = { bottom: layoutBoundsBottom + BOTTOM_OFFSET, left: 78, scale: SCALE };
    var headOptions = { bottom: layoutBoundsBottom + BOTTOM_OFFSET, left: 75, scale: SCALE };

    // create nodes for each head image
    var silhouetteNode = new Image( silhouetteImage, silhouetteOptions );
    var headNode = new Image( headImage, headOptions );
    var silhouetteFrontNode = new Image( silhouetteFrontImage, silhouetteOptions );
    var headFrontNode = new Image( headFrontImage, headOptions );

    // Make sure only one image is visible at at time, depending on the user's selection
    headModeProperty.link( function( mode ) {
      silhouetteNode.visible = ( mode === 'brain' );
      headNode.visible = ( mode === 'no-brain' );
      silhouetteFrontNode.visible = ( mode === 'brain' );
      headFrontNode.visible = ( mode === 'no-brain' );
    } );

    // add full head images first so they show up in back
    this.addChild( silhouetteNode );
    this.addChild( headNode );

    // add the photon beams on top of the head images
    // this is only needed in the RGB screen. The single bulb screen takes care of its own layering to account for the filter
    if ( photonBeams ) {
      for ( var i = 0; i < photonBeams.length; i++ ) {
        this.addChild( photonBeams[ i ] );
      }
    }

    // add the front head image with the nose cut out so the photons get cut off at the right place (by going under these nodes)
    this.addChild( silhouetteFrontNode );
    this.addChild( headFrontNode );

    // Add head mode toggle
    var toggleButtonsContent = [ {
      value: 'no-brain',
      node: new Image( silhouetteIcon, { scale: IMAGE_SCALE } ),
      togetherID: options.hideBrainRadioButtonComponentID
    }, {
      value: 'brain',
      node: new Image( headIcon, { scale: IMAGE_SCALE } ),
      togetherID: options.showBrainRadioButtonComponentID
    } ];

    this.addChild( new RadioButtonGroup( headModeProperty, toggleButtonsContent,
      _.extend( {
        buttonContentXMargin: 4,
        buttonContentYMargin: 4,
        bottom:  layoutBoundsBottom - 22,
        centerX: silhouetteNode.centerX - 42
      }, ColorVisionConstants.RADIO_BUTTON_OPTIONS ) ) );
  }

  return inherit( Node, HeadNode );
} );
