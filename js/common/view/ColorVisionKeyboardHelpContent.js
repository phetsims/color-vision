// Copyright 2024, University of Colorado Boulder

/**
 * This dialog provides keyboard help for all screens in this simulation.
 *
 * @author Luisa Vargas
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import KeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/KeyboardHelpSection.js';
import SliderControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/SliderControlsKeyboardHelpSection.js';
import TimingControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/TimingControlsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import colorVision from '../../colorVision.js';

class ColorVisionKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  constructor() {

    // Create the various sections that will be combined to make up the dialog contents.
    const sliderHelpSection = new SliderControlsKeyboardHelpSection();
    const basicActionsHelpSection = new BasicActionsKeyboardHelpSection();
    const timingControlsHelpSection = new TimingControlsKeyboardHelpSection();

    // Vertically align the left sections.
    KeyboardHelpSection.alignHelpSectionIcons( [ sliderHelpSection, timingControlsHelpSection ] );

    super( [ sliderHelpSection, timingControlsHelpSection ], [ basicActionsHelpSection ] );
  }
}

colorVision.register( 'ColorVisionKeyboardHelpContent', ColorVisionKeyboardHelpContent );
export default ColorVisionKeyboardHelpContent;