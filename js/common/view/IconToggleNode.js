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

  function IconToggleNode( property, iconOne, iconTwo, valueOne, valueTwo, options ) {

    options = _.extend( {
      scale: 0.8,
      fill: 'rgba(0,0,0,0)',
      stroke: 'yellow',
      selectedLineWidth: 1.3,
      deselectedLineWidth: 0.6
    }, options );

    var panelOptions = {
      xMargin: 0,
      yMargin: 0,
      cornerRadius: 4,
      fill: options.fill
    };

    var selectedOptions = _.extend( { stroke: options.stroke, lineWidth: options.selectedLineWidth }, panelOptions );

    var deselectedOptions = _.extend( { lineDash: [2, 2], stroke: options.stroke, lineWidth: options.deselectedLineWidth }, panelOptions );

    var panelOne = new Panel( new Image( iconOne, { scale: options.scale } ), selectedOptions );
    var buttonOne = new RadioButton( property, valueOne, panelOne, new Panel( new Image( iconOne, { scale: options.scale } ), deselectedOptions ) );

    var panelTwo = new Panel( new Image( iconTwo, { scale: options.scale } ), selectedOptions );
    var buttonTwo = new RadioButton( property, valueTwo, panelTwo, new Panel( new Image( iconTwo, { scale: options.scale } ), deselectedOptions ) );

    HBox.call( this, { spacing: 13, children: [buttonOne, buttonTwo] } );

    this.mutate( options );
  }

  return inherit( HBox, IconToggleNode );
} );
