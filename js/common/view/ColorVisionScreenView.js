// Copyright 2014-2020, University of Colorado Boulder

/**
 * View components shared by both screens. Subclassed by SingleBulbScreenView and RGBScreenView.
 *
 * @author Aaron Davis
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import inherit from '../../../../phet-core/js/inherit.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import colorVision from '../../colorVision.js';
import PerceivedColorNode from './PerceivedColorNode.js';

/**
 * @param {ColorVisionModel} model
 * @param {Tandem} tandem
 * @constructor
 */
function ColorVisionScreenView( model, tandem ) {

  ScreenView.call( this, {
    layoutBounds: new Bounds2( 0, 0, 768, 504 ),
    tandem: tandem
  } );

  // 'Thought bubbles' that display perceived color
  const perceivedColorNode = new PerceivedColorNode( model.perceivedColorProperty, {
    left: 20,
    top: 5
  } );
  this.addChild( perceivedColorNode );

  // add the play/pause and step buttons
  const timeControlNode = new TimeControlNode( model.playingProperty, {
    bottom: this.layoutBounds.bottom - 20,
    centerX: this.layoutBounds.centerX - 3,
    playPauseStepXSpacing: 14,
    stepForwardOptions: {
      listener: () => model.manualStep()
    },
    tandem: tandem.createTandem( 'timeControlNode' )
  } );
  this.addChild( timeControlNode );

  // Reset All button
  const resetAllButton = new ResetAllButton( {
    listener: function() { model.reset(); },
    bottom: this.layoutBounds.bottom - 5,
    right: this.layoutBounds.right - 30,
    radius: 18,
    tandem: tandem.createTandem( 'resetAllButton' )
  } );
  this.addChild( resetAllButton );
}

colorVision.register( 'ColorVisionScreenView', ColorVisionScreenView );

inherit( ScreenView, ColorVisionScreenView );
export default ColorVisionScreenView;