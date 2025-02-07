// Copyright 2024, University of Colorado Boulder

/**
 * FlashlightNode - for use inside icons for both screens.
 *
 * @author Luisa Vargas
 */

import Shape from '../../../../kite/js/Shape.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Color from '../../../../scenery/js/util/Color.js';
import LinearGradient from '../../../../scenery/js/util/LinearGradient.js';
import colorVision from '../../colorVision.js';

class FlashlightNode extends Node {

  /**
   * @param {number} rotation - The rotation angle at which the flashlight is tilted, in radians.
   * @param {Object} [options]
   */
  constructor( rotation, options ) {

    super( options );

    // Many of the values defined in this constructor, such as the dimensions of the flashlight and the spacing of the
    // vertical lines, were empirically determined to match the original flashlight image.

    // Define the dimensions for the flashlight
    const headWidth = 18;
    const headHeight = 51.75;
    const jointWidth = 16.25;
    const shorterJointHeight = 35;
    const bodyLength = 150;
    const hSpaceFromBody = 10;

    // Define the colors for the flashlight gradient
    const flashlightColors = [
      new Color( 138, 139, 140 ), // darkest color
      new Color( 186, 187, 189 ), // middle color
      new Color( 227, 228, 229 )  // lightest color
    ];

    // Define the flashlight stroke's gradient colors
    const strokeColors = [
      new Color( 68, 69, 70 ),     // darkest stroke color
      new Color( 75, 76, 77 ),
      new Color( 97, 98, 98 ),
      new Color( 114, 114, 115 )   // lightest stroke color
    ];

    // Calculate the x and y offsets for the gradient based on the rotation
    const xOffset = Math.sin( rotation ) * headHeight / 2;
    const yOffset = Math.cos( rotation ) * headHeight / 2;

    // Function to creates a rotated LinearGradient for the flashlight using 'flashlightColors'.
    // gradientHeightAdjustment is used for vertical shift of the gradient to achieve a 3D overall metallic look.
    const createFlashlightGradient = gradientHeightAdjustment => {
      return new LinearGradient( -xOffset, -yOffset + gradientHeightAdjustment, xOffset, yOffset + gradientHeightAdjustment )
        .addColorStop( 0, flashlightColors[ 0 ] )
        .addColorStop( 0.15, flashlightColors[ 1 ] )
        .addColorStop( 0.3, flashlightColors[ 2 ] )
        .addColorStop( 0.45, flashlightColors[ 2 ] )
        .addColorStop( 0.6, flashlightColors[ 1 ] )
        .addColorStop( 0.9, flashlightColors[ 0 ] );
    };

    // Define the flashlight stroke's gradient
    const flashlightStrokeGradient = new LinearGradient( -xOffset, -yOffset, xOffset, yOffset )
      .addColorStop( 0, strokeColors[ 0 ] )
      .addColorStop( 0.15, strokeColors[ 2 ] )
      .addColorStop( 0.3, strokeColors[ 3 ] )
      .addColorStop( 0.75, strokeColors[ 1 ] )
      .addColorStop( 1, strokeColors[ 0 ] );

    // Create the flashlight head as a trapezoidal shape
    const flashlightHeadShape = new Shape()
      .moveTo( 0, -headHeight / 2 )
      .lineTo( -headWidth, -headHeight / 2 )
      .lineTo( -headWidth, headHeight / 2 )
      .lineTo( 0, headHeight / 2 )
      .lineTo( jointWidth, shorterJointHeight / 2 )
      .lineTo( jointWidth, -shorterJointHeight / 2 )
      .close();
    const flashlightHeadFillGradient = createFlashlightGradient( 0 );
    const flashlightHeadPath = new Path( flashlightHeadShape,
      { fill: flashlightHeadFillGradient, stroke: flashlightStrokeGradient, lineWidth: 0.75 } );

    const flashlightHeadStroke = new Line( 0, flashlightHeadPath.top, 0, flashlightHeadPath.bottom,
      { stroke: flashlightStrokeGradient, lineWidth: 0.75 } );
    flashlightHeadPath.addChild( flashlightHeadStroke );

    // Draw the flashlight body
    const gradientHeightAdjustment = rotation < 0 ? -25 : ( rotation > 0 ? 15 : 0 );
    const flashlightBodyFillGradient = createFlashlightGradient( gradientHeightAdjustment );
    const flashlightBody = new Rectangle( 0, -headHeight / 2, bodyLength, headHeight,
      { fill: flashlightBodyFillGradient, stroke: flashlightStrokeGradient, lineWidth: 0.5, scale: 0.675 } );

    // Define a lighter color and thicker lineWidth for the 1st, 5th, and 9th lines
    const colors = [ new Color( 121, 123, 124 ), new Color( 88, 86, 87 ) ];
    const lineWidths = [ 2, 1 ];

    // Create the vertical lines in the body
    const spacing = headHeight / 10.5;
    const numberOfLines = 10;
    const linesNode = new Node();
    for ( let i = 0; i < numberOfLines; i++ ) {
      const index = ( i === 0 || i === 4 || i === 8 ) ? 0 : 1;
      const y = ( -headHeight / 2 ) + 3 + i * spacing;
      const line = new Line( flashlightBody.left + hSpaceFromBody, y, bodyLength - hSpaceFromBody, y, {
        stroke: colors[ index ],
        lineWidth: lineWidths[ index ]
      } );
      linesNode.addChild( line );
    }
    flashlightBody.addChild( linesNode );

    // Combine the head and body to create the flashlight
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