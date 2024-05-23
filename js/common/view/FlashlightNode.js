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
   * @param {number} rotation - The rotation of the flashlight.
   * @param {Object} [options]
   */
  constructor( rotation, options ) {

    super( options );

    // Define the dimensions for the flashlight
    const headWidth = 18;
    const headHeight = 51.75;
    const jointWidth = 16.25;
    const shorterJointHeight = 35;
    const bodyLength = 150;
    const hSpaceFromBody = 10;

    // Define the colors for the flashlight gradient
    const darkestColor = new Color( 138, 139, 140 );
    const middleColor = new Color( 186, 187, 189 );
    const lightestColor = new Color( 227, 228, 229 );

    // Calculate the x and y offsets for the gradient based on the rotation
    const xOffset = Math.sin( rotation ) * headHeight / 2;
    const yOffset = Math.cos( rotation ) * headHeight / 2;

    // Function to create the flashlight gradient. The gradient is rotated based on the rotation of the flashlight,
    // which affects the direction of the gradient to give the flashlight a realistic metallic look.
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

    // Create the flashlight head as a trapezoidal shape
    const flashlightHeadShape = new Shape()
      .moveTo( 0, -headHeight / 2 )
      .lineTo( -headWidth, -headHeight / 2 )
      .lineTo( -headWidth, headHeight / 2 )
      .lineTo( 0, headHeight / 2 )
      .lineTo( jointWidth, shorterJointHeight / 2 )
      .lineTo( jointWidth, -shorterJointHeight / 2 )
      .close();
    const flashlightHeadPath = new Path( flashlightHeadShape,
      { fill: flashlightHeadFillGradient, stroke: flashlightStrokeGradient, lineWidth: 0.75 } );

    const flashlightHeadStroke = new Line( 0, flashlightHeadPath.top, 0, flashlightHeadPath.bottom,
      { stroke: flashlightStrokeGradient, lineWidth: 0.75 } );
    flashlightHeadPath.addChild( flashlightHeadStroke );

    // Draw the flashlight body
    const flashlightBodyFillGradient = createFlashlightGradient();
    const gradientAdjustment = rotation < 0 ? -25 : ( rotation > 0 ? 15 : 0 );
    flashlightBodyFillGradient.start = new Vector2( -xOffset, -yOffset + gradientAdjustment );
    flashlightBodyFillGradient.end = new Vector2( xOffset, yOffset + gradientAdjustment );
    const flashlightBody = new Rectangle( 0, -headHeight / 2, bodyLength, headHeight,
      { fill: flashlightBodyFillGradient, stroke: flashlightStrokeGradient, lineWidth: 0.5, scale: 0.675 } );

    // Define a lighter color and thicker lineWidth for the 1st, 5th, and 9th lines
    const colors = [ new Color( 121, 123, 124 ), new Color( 88, 86, 87 ) ];
    const lineWidths = [ 2, 1 ];

    // Create the vertical lines in the body
    const spacing = headHeight / 10.5;
    const linesNode = new Node();
    for ( let i = 0; i < 10; i++ ) {
      const index = ( i === 0 || i === 4 || i === 8 ) ? 0 : 1;
      const y = ( -headHeight / 2 ) + 3 + i * spacing;
      const line = new Line( flashlightBody.left + hSpaceFromBody, y, bodyLength - hSpaceFromBody, y, {
        stroke: colors[ index ],
        lineWidth: lineWidths[ index ]
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