// Copyright 2002-2014, University of Colorado Boulder

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
   * @param {Node} iconOne
   * @param {Node} iconTwo
   * @param {*} valueOne
   * @param {*} valueTwo
   * @param {Object} [options]
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
    var deselectedOptions = _.extend( { lineWidth: options.deselectedLineWidth, opacity: 0.5 }, panelOptions );

    var panelOne = new Panel( iconOne, selectedOptions );
    var buttonOne = new RadioButton( property, valueOne, panelOne, new Panel( iconOne, deselectedOptions ) );

    var panelTwo = new Panel( iconTwo, selectedOptions );
    var buttonTwo = new RadioButton( property, valueTwo, panelTwo, new Panel( iconTwo, deselectedOptions ) );

    options.children = [buttonOne, buttonTwo];
    HBox.call( this, options );
  }

  return inherit( HBox, IconToggleNode );
} );
