// Copyright 2002-2014, University of Colorado Boulder

/**
 * Panel containing a set of toggle buttons that determine which head view to display.
 *
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var IconToggleNode = require( 'COLOR_VISION/common/view/IconToggleNode' );
  var Image = require( 'SCENERY/nodes/Image' );

  // images
  var headIcon = require( 'image!COLOR_VISION/silhouette-icon.png' );
  var silhouetteIcon = require( 'image!COLOR_VISION/head-icon.png' );

  // constants
  var IMAGE_SCALE = 0.05;

  /**
   * @param {Property} property
   * @param {Object} options
   * @constructor
   */
  function HeadToggleNode( property, options ) {

    options = _.extend( {
      iconFill: 'black',
      iconXMargin: 4,
      iconYMargin: 4
    }, options );

    var headNode = new Image( silhouetteIcon, { scale: IMAGE_SCALE } );
    var silhouetteNode = new Image( headIcon, { scale: IMAGE_SCALE } );

    IconToggleNode.call( this, property, headNode, silhouetteNode, 'no-brain', 'brain', options );
  }

  return inherit( IconToggleNode, HeadToggleNode );
} );
