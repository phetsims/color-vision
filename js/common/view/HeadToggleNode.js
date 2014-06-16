// Copyright 2002-2013, University of Colorado Boulder

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
  var headIcon = require( 'image!COLOR_VISION/head-icon.png' );
  var headNoBrainIcon = require( 'image!COLOR_VISION/head-no-brain-icon.png' );

  function HeadToggleNode( property, options ) {

    options = _.extend( {
      scale: 0.8,
      spacing: 30,
      outerFill: '#dddddd',
      outerStroke: 'white',
      selectedLineWidth: 2,
      deselectedLineWidth: 1.5
    }, options );

    var headWithBrainImage = new Image( headIcon );
    var headNoBrainImage = new Image( headNoBrainIcon );

    IconToggleNode.call( this, property, headWithBrainImage, headNoBrainImage, 'brain', 'no-brain', options );

    this.mutate( options );
  }

  return inherit( IconToggleNode, HeadToggleNode );
} );
