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

    var scale = 0.6;
    var selectedStroke = '#3291b8';
    var deselectedStroke = null;
    var panelOptions = {
      xMargin: 0,
      yMargin: 0,
      cornerRadius: 4
    };
    var lineWidth = 1.6;
    var selectedOptions = _.extend( {stroke: selectedStroke, lineWidth: lineWidth}, panelOptions );
    var deselectedOptions = _.extend( {stroke: deselectedStroke, lineWidth: lineWidth}, panelOptions );

    var attachPanel = new Panel( new Image( iconOne, {scale: scale} ), selectedOptions );
    var attachButton = new RadioButton( property, valueOne, attachPanel, new Panel( new Image( iconOne, {scale: scale} ), deselectedOptions ) );

    var detachPanel = new Panel( new Image( iconTwo, {scale: scale} ), selectedOptions );
    var detachButton = new RadioButton( property, valueTwo, detachPanel, new Panel( new Image( iconTwo, {scale: scale} ), deselectedOptions ) );

    var hbox = new HBox( {spacing: 13, children: [attachButton, detachButton]} );
    Panel.call( this, hbox, {fill: '#dddddd', stroke: null} );

    this.mutate( options );
  }

  return inherit( Panel, ColorVisionToggleButtons );
} );