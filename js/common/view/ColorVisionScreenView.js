// Copyright 2014-2023, University of Colorado Boulder

/**
 * View components shared by both screens. Subclassed by SingleBulbScreenView and RGBScreenView.
 *
 * @author Aaron Davis
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import TimeControlNode from '../../../../scenery-phet/js/TimeControlNode.js';
import colorVision from '../../colorVision.js';
import PerceivedColorNode from './PerceivedColorNode.js';

class ColorVisionScreenView extends ScreenView {

  /**
   * @param {ColorVisionModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {

    super( {

      // A PhET wide decision was made to not update custom layout bounds even if they do not match the
      // default layout bounds in ScreenView. Do not change these bounds as changes could break or disturb
      // any phet-io instrumention. https://github.com/phetsims/phet-io/issues/1939
      layoutBounds: new Bounds2( 0, 0, 768, 504 ),
      tandem: tandem
    } );

    // 'Thought bubbles' that display perceived color
    const perceivedColorNode = new PerceivedColorNode( model.perceivedColorProperty, model.playingProperty, {
      left: 20,
      top: 5
    } );
    this.pdomPlayAreaNode.addChild( perceivedColorNode );

    // @protected (read-only) {TimeControlNode} - the play/pause and step buttons
    this.timeControlNode = new TimeControlNode( model.playingProperty, {
      bottom: this.layoutBounds.bottom - 20,
      centerX: this.layoutBounds.centerX - 3,
      playPauseStepButtonOptions: {
        playPauseStepXSpacing: 14,
        stepForwardButtonOptions: {
          listener: () => model.manualStep()
        }
      },
      tandem: tandem.createTandem( 'timeControlNode' )
    } );
    this.pdomControlAreaNode.addChild( this.timeControlNode );

    // @protected (read-only) {ResetAllButton} - the Reset All button
    this.resetAllButton = new ResetAllButton( {
      listener: () => { model.reset(); },
      bottom: this.layoutBounds.bottom - 5,
      right: this.layoutBounds.right - 30,
      radius: 18,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.pdomControlAreaNode.addChild( this.resetAllButton );

    // set the tab navigation order
    this.pdomControlAreaNode.pdomOrder = [
      this.timeControlNode,
      this.resetAllButton
    ];
  }
}

colorVision.register( 'ColorVisionScreenView', ColorVisionScreenView );
export default ColorVisionScreenView;