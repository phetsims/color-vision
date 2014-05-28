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
  var OnOffSwitch = require( 'SUN/OnOffSwitch' );

  /**
   * @param{Vector2} start
   * @param{Vector2} end
   * @constructor
   */
  function FilterWireNode( onProperty, start, end ) {

    Node.call( this );

    var holderWidth = 10;
    var radius = 5;
    var switchDistance = ( start.y - end.y ) / 3;
    var switchHeight = 17;

    var wire = new Shape()
      .moveTo( start.x, start.y )
      .lineTo( start.x + holderWidth, start.y )
      .lineTo( start.x + holderWidth, start.y - holderWidth )
      .moveTo( start.x, start.y )
      .lineTo( start.x - holderWidth, start.y )
      .lineTo( start.x - holderWidth, start.y - holderWidth )
      .moveTo( start.x, start.y )
      .lineTo( start.x, start.y - switchDistance )
      .moveTo( start.x, start.y - switchDistance - switchHeight )
      .lineTo( start.x, end.y - radius )
      .arc( start.x + radius, end.y - radius, radius, Math.PI, Math.PI / 2, true )
      .lineTo( end.x, end.y );

    var wirePath = new Path( wire,
      {
        lineWidth: 5,
        stroke: '#999999',
      } );

    var onOffSwitch = new OnOffSwitch( onProperty,
      {
        size: new Dimension2( switchHeight * 2, switchHeight ),
        centerTop: new Vector2( start.x, start.y - switchDistance ),
        trackOffFill: 'gray',
        trackOnFill: 'black',
        trackStroke: 'yellow'
      } );

    this.addChild( wirePath );
    this.addChild( onOffSwitch );

  }

  return inherit( Node, FilterWireNode );
} );
