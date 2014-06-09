// Copyright 2002-2013, University of Colorado Boulder

/**
 * Panel containing a set of toggle buttons.
 *
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Panel = require( 'SUN/Panel' );
  var RadioButton = require( 'SUN/RadioButton' );

  // images
  var whiteLightIcon = require( 'image!COLOR_VISION/color-vision-white-light-icon.png' );
  var singleColorLightIcon = require( 'image!COLOR_VISION/color-vision-single-color-light-icon.png' );
  var beamViewIcon = require( 'image!COLOR_VISION/color-vision-beam-view-icon.png' );
  var photonViewIcon = require( 'image!COLOR_VISION/color-vision-photon-view-icon.png' );

  function ColorVisionToggleButtons( property, buttonSet, options ) {
    var iconOne, iconTwo, valueOne, valueTwo;
    if ( buttonSet === 'color' ) {
      iconOne = whiteLightIcon;
      iconTwo = singleColorLightIcon;
      valueOne = 'white';
      valueTwo = 'colored';
    }
    else if ( buttonSet === 'beam' ) {
      iconOne = beamViewIcon;
      iconTwo = photonViewIcon;
      valueOne = 'beam';
      valueTwo = 'photon';
    }
    else {
      console.error( 'error: ColorVisionToggleButtons must take either "color" or "beam" as second argument' );
    }

    var panelOptions = {
      xMargin: 0,
      yMargin: 0,
      cornerRadius: 4
    };

    // values that are the same for both selected and deselected
    var scale = 0.6;
    var fill = 'rgba(0,0,0,0)';
    var stroke = 'yellow';

    var selectedOptions = _.extend( { stroke: stroke, lineWidth: 1.3, fill: fill }, panelOptions );

    // why is lineDash not working?
    var deselectedOptions = _.extend( { lineDashOffset: 0, lineDash: [1, 5], stroke: stroke, lineWidth: 0.6, fill: fill }, panelOptions );

    var attachPanel = new Panel( new Image( iconOne, { scale: scale } ), selectedOptions );
    var attachButton = new RadioButton( property, valueOne, attachPanel, new Panel( new Image( iconOne, { scale: scale } ), deselectedOptions ) );

    var detachPanel = new Panel( new Image( iconTwo, { scale: scale } ), selectedOptions );
    var detachButton = new RadioButton( property, valueTwo, detachPanel, new Panel( new Image( iconTwo, { scale: scale } ), deselectedOptions ) );

    HBox.call( this, { spacing: 13, children: [attachButton, detachButton] } );

    this.mutate( options );
  }

  return inherit( HBox, ColorVisionToggleButtons );
} );