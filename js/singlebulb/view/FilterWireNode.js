// Copyright 2002-2013, University of Colorado Boulder

/**
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );
  var Shape = require( 'KITE/Shape' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var OnOffSwitch = require( 'SUN/OnOffSwitch' );

  /**
   * @param {Property} onProperty
   * @param {Vector2} start
   * @param {Vector2} end
   * @constructor
   */
  function FilterWireNode( onProperty, start, end ) {

    Node.call( this );

    var holderWidth = 10;
    var radius = 5;
    var switchDistance = ( end.y - start.y ) / 3;
    var switchHeight = 17;
    var switchWidth = 8;

    var wire = new Shape()
      .moveTo( start.x, start.y )
      .lineTo( start.x + holderWidth, start.y )
      .lineTo( start.x + holderWidth, start.y - holderWidth )
      .moveTo( start.x, start.y )
      .lineTo( start.x - holderWidth, start.y )
      .lineTo( start.x - holderWidth, start.y - holderWidth )
      .moveTo( start.x, start.y )
      .lineTo( start.x, end.y - radius )
      .arc( start.x + radius, end.y - radius, radius, Math.PI, Math.PI / 2, true )
      .lineTo( end.x, end.y );

    var wirePath = new Path( wire, { lineWidth: 5, stroke: '#999999' } );

    var swtichOutline = new Shape()
      .arc( start.x + switchWidth, start.y + switchDistance + switchHeight / 2, 10, -Math.PI / 2, Math.PI / 2 )
      .arc( start.x - switchWidth, start.y + switchDistance + switchHeight / 2, 10, Math.PI / 2, -Math.PI / 2 )
      .lineTo( start.x + switchWidth, start.y + switchDistance - 1.5 );

    var outlinePath = new Path( swtichOutline, { lineWidth: 8, stroke: '#666666' } );

    var onOffSwitch = new OnOffSwitch( onProperty,
      {
        size: new Dimension2( switchHeight * 2, switchHeight ),
        centerTop: new Vector2( start.x, start.y + switchDistance ),
        thumbFill: new LinearGradient( 0, 0, 0, switchHeight ).addColorStop( 0, 'black' ).addColorStop( 1, 'gray' ),
        trackOffFill: '#eeeeee',
        trackOnFill: '#eeeeee',
        trackStroke: 'black',
        thumbStroke: null
      } );

    this.addChild( wirePath );
    this.addChild( outlinePath );
    this.addChild( onOffSwitch );

  }

  return inherit( Node, FilterWireNode );
} );
