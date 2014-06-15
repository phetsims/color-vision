// Copyright 2002-2013, University of Colorado Boulder

/**
 * Panel containing a set of toggle buttons. Should this be move to common code?
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

  function IconToggleNode( property, iconOne, iconTwo, valueOne, valueTwo, options ) {

    options = _.extend( {
      scale: 0.8,
      innerFill: 'rgba(0,0,0,0)',
      outerFill: 'rgba(0,0,0,0)',
      innerStroke: 'yellow',
      outerStroke: null,
      selectedLineWidth: 1.3,
      deselectedLineWidth: 0.6,
      spacing: 13
    }, options );

    var panelOptions = {
      xMargin: 0,
      yMargin: 0,
      cornerRadius: 4,
      fill: options.innerFill,
      stroke: options.innerStroke
    };

    var selectedOptions = _.extend( { lineWidth: options.selectedLineWidth }, panelOptions );

    var deselectedOptions = _.extend( { lineDash: [2, 2], lineWidth: options.deselectedLineWidth }, panelOptions );

    var panelOne = new Panel( new Image( iconOne, { scale: options.scale } ), selectedOptions );
    var buttonOne = new RadioButton( property, valueOne, panelOne, new Panel( new Image( iconOne, { scale: options.scale } ), deselectedOptions ) );

    var panelTwo = new Panel( new Image( iconTwo, { scale: options.scale } ), selectedOptions );
    var buttonTwo = new RadioButton( property, valueTwo, panelTwo, new Panel( new Image( iconTwo, { scale: options.scale } ), deselectedOptions ) );

    var hbox = new HBox( { spacing: options.spacing, children: [buttonOne, buttonTwo] } );

    Panel.call( this, hbox, { fill: options.outerFill, stroke: options.outerStroke } );

    this.mutate( options );
  }

  return inherit( Panel, IconToggleNode );
} );
