// Copyright 2002-2013, University of Colorado Boulder

/**
 * Panel containing a set of toggle buttons. Should this be moved to common code?
 *
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Panel = require( 'SUN/Panel' );
  var RadioButton = require( 'SUN/RadioButton' );

  /**
   * @param {Property} property
   * @param {Image} iconOne
   * @param {Image} iconTwo
   * @param {*} valueOne
   * @param {*} valueTwo
   * @param {Object} options
   * @constructor
   */
  function IconToggleNode( property, iconOne, iconTwo, valueOne, valueTwo, options ) {

    options = _.extend( {
      iconFill: null,
      iconStroke: 'yellow',
      selectedLineWidth: 1.3,
      deselectedLineWidth: 0.6,
      spacing: 13,
      iconXMargin: 0,
      iconYMargin: 0
    }, options );

    var panelOptions = {
      xMargin: options.iconXMargin,
      yMargin: options.iconYMargin,
      cornerRadius: 4,
      fill: options.iconFill,
      stroke: options.iconStroke
    };

    var selectedOptions = _.extend( { lineWidth: options.selectedLineWidth }, panelOptions );
    var deselectedOptions = _.extend( { lineDash: [2, 2], lineWidth: options.deselectedLineWidth }, panelOptions );

    var panelOne = new Panel( iconOne, selectedOptions );
    var buttonOne = new RadioButton( property, valueOne, panelOne, new Panel( iconOne, deselectedOptions ) );

    var panelTwo = new Panel( iconTwo, selectedOptions );
    var buttonTwo = new RadioButton( property, valueTwo, panelTwo, new Panel( iconTwo, deselectedOptions ) );

    HBox.call( this, { spacing: options.spacing, children: [buttonOne, buttonTwo] } );

    this.mutate( options );
  }

  return inherit( HBox, IconToggleNode );
} );
