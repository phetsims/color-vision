// Copyright 2024, University of Colorado Boulder

/**
 * FlashlightNode - for use inside icons for both screens.
 *
 * @author Luisa Vargas
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import { Shape } from '../../../../kite/js/imports.js';
import { Color, HBox, Line, LinearGradient, Node, Path, Rectangle } from '../../../../scenery/js/imports.js';
import colorVision from '../../colorVision.js';

class FlashlightNode extends Node {

  /**
   * @param {number} rotation
   * @param {Object} [options]
   */
  constructor( rotation, options ) {

    super( options );

    // Vector positions adn dimensions to draw the flashlight
    const headWidth = 18;
    const headHeight = 51.75;
    const jointWidth = 16.25;
    const shorterJointHeight = 35;
    const bodyLength = 150;
    const hSpaceFromBody = 10;

    // Define the gradient for the flashlight
    const darkestColor = new Color( 138, 139, 140 );
    const middleColor = new Color( 186, 187, 189 );
    const lightestColor = new Color( 227, 228, 229 );

    // Calculate the x and y offsets for the gradient based on the rotation
    const xOffset = Math.sin( rotation ) * headHeight / 2;
    const yOffset = Math.cos( rotation ) * headHeight / 2;

    const createFlashlightGradient = () => {
      return new LinearGradient( -xOffset, -yOffset, xOffset, yOffset )
        .addColorStop( 0, darkestColor )
        .addColorStop( 0.15, middleColor )
        .addColorStop( 0.3, lightestColor )
        .addColorStop( 0.45, lightestColor )
        .addColorStop( 0.6, middleColor )
        .addColorStop( 0.9, darkestColor );
    };

    // Define the flashlight gradient
    const flashlightHeadFillGradient = createFlashlightGradient();

    // Define the flashlight stroke's gradient
    const darkestStrokeColor = new Color( 68, 69, 70 );
    const flashlightStrokeGradient = new LinearGradient( -xOffset, -yOffset, xOffset, yOffset )
      .addColorStop( 0, darkestStrokeColor )
      .addColorStop( 0.15, new Color( 97, 98, 98 ) )
      .addColorStop( 0.3, new Color( 114, 114, 115 ) )
      .addColorStop( 0.75, new Color( 75, 76, 77 ) )
      .addColorStop( 1, darkestStrokeColor );

    // Create the flashlight head
    const flashlightHeadShape = new Shape()
      .moveTo( 0, -headHeight / 2 ) // Start at the top-left of the head
      .lineTo( -headWidth, -headHeight / 2 ) // Draw the top-right of the head
      .lineTo( -headWidth, headHeight / 2 ) // Draw the right side of the head
      .lineTo( 0, headHeight / 2 ) // Draw the bottom of the head
      .lineTo( jointWidth, shorterJointHeight / 2 ) // Draw the bottom side of the trapezoid
      .lineTo( jointWidth, -shorterJointHeight / 2 ) // Draw the top side of the trapezoid
      .close();
    const flashlightHeadPath = new Path( flashlightHeadShape,
      { fill: flashlightHeadFillGradient, stroke: flashlightStrokeGradient, lineWidth: 0.75 } );

    const flashlightHeadStroke = new Line( 0, flashlightHeadPath.top, 0, flashlightHeadPath.bottom,
      { stroke: flashlightStrokeGradient, lineWidth: 0.75 } );
    flashlightHeadPath.addChild( flashlightHeadStroke );

    // Draw the flashlight body
    const flashlightBodyFillGradient = createFlashlightGradient();
    if ( rotation < 0 ) {
      flashlightBodyFillGradient.start = new Vector2( -xOffset, -yOffset - 25 );
      flashlightBodyFillGradient.end = new Vector2( xOffset, yOffset - 25 );
    }
    else if ( rotation > 0 ) {
      flashlightBodyFillGradient.start = new Vector2( -xOffset, -yOffset + 15 );
      flashlightBodyFillGradient.end = new Vector2( xOffset, yOffset + 15 );
    }
    const flashlightBody = new Rectangle( 0, -headHeight / 2, bodyLength, headHeight,
      { fill: flashlightBodyFillGradient, stroke: flashlightStrokeGradient, lineWidth: 0.5, scale: 0.675 } );

    // Define the vertical lines in the body
    const spacing = headHeight / 10.5;
    const linesNode = new Node();
    for ( let i = 0; i < 10; i++ ) {

      // Define a lighter color for the 1st, 5th, and 9th lines
      const color = ( i === 0 || i === 4 || i === 8 ) ? new Color( 121, 123, 124 ) : new Color( 88, 86, 87 );

      const y = ( -headHeight / 2 ) + 3 + i * spacing;
      const line = new Line( flashlightBody.left + hSpaceFromBody, y, bodyLength - hSpaceFromBody, y, {
        stroke: color,
        lineWidth: ( i === 0 || i === 4 || i === 8 ) ? 2 : 1
      } );
      linesNode.addChild( line );
    }
    flashlightBody.addChild( linesNode );

    // Combine the head and body to create the flashlight using HBox
    const flashlight = new HBox( {
      children: [ flashlightHeadPath, flashlightBody ],
      spacing: 0,
      align: 'center'
    } );

    this.addChild( flashlight );
  }
}

colorVision.register( 'FlashlightNode', FlashlightNode );

export default FlashlightNode;