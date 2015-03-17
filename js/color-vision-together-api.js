//  Copyright 2002-2014, University of Colorado Boulder

/**
 * This is the public API for the concentration sim.  It can be used in concert with together.js and arch.js for API
 * simulation features.
 *
 * Conventions:
 * 1. Property names should start with the screen name. This will enable usage in sims where screens are mixed and matced
 * 2. Most components will be top level within the screen.  Sometime nested structure is valuable for composite items
 * 3. UI components have the component type as the suffix, such as showTimerButton.  Model components do not have a suffix
 *      such as concentrationScreen.solute
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  var togetherTypes = require( 'JOIST/togetherTypes' );

  // Convenience imports to make the API read more clearly below.
  var Button = togetherTypes.Button;
  var Number = togetherTypes.Number;
  var PlayPauseButton = togetherTypes.PlayPauseButton;
  var String = togetherTypes.String;
  var property = togetherTypes.property;
  var Vector2 = togetherTypes.Vector2;
  var Slider = togetherTypes.Slider;
  var Faucet = togetherTypes.Faucet;
  var ResetAllButton = togetherTypes.ResetAllButton;
  var RadioButton = togetherTypes.RadioButton;
  var OnOffSwitch = togetherTypes.OnOffSwitch;
  var ComboBox = togetherTypes.ComboBox;
  var ComboBoxListItem = togetherTypes.ComboBoxListItem;
  var Color = togetherTypes.Color;
  var Node = togetherTypes.Node;
  var CheckBox = togetherTypes.CheckBox;
  var Boolean = togetherTypes.Boolean;

  // Use explicit names for id keys so they will match what researchers see in data files
  // Use id and type instead of componentID and typeID to simplify things for researchers
  // Use a map so that JS will help us check that there are no duplicate names.
  return togetherTypes.createMultipleScreen( [

    // Home Screen items
    {
      'homeScreen.singleBulbScreenButton': { type: Button },
      'homeScreen.rgbScreenButton': { type: Button }
    },

    // Shared Screen items
    {
      'navigationBar.rgbScreenButton': { type: Button },
      'navigationBar.singleBulbScreenButton': { type: Button }
    },

    // Single bulb screen
    {
      'singleBulbScreen.bulbColorSlider': { type: Slider },
      'singleBulbScreen.filterColorSlider': { type: Slider },
      'singleBulbScreen.flashlightWavelength': { type: property( Number ), units: 'nm' },
      'singleBulbScreen.lightType': { type: property( String ) },
      'singleBulbScreen.beamType': { type: property( String ) },
      'singleBulbScreen.filterWavelength': { type: property( Number ), units: 'nm' },
      'singleBulbScreen.flashlightOn': { type: property( Boolean ) },
      'singleBulbScreen.filterVisible': { type: property( Boolean ) },
      'singleBulbScreen.playing': { type: property( Boolean ) },
      'singleBulbScreen.headMode': { type: property( String ) },
      'singleBulbScreen.whiteLightRadioButton': { type: RadioButton },
      'singleBulbScreen.coloredLightRadioButton': { type: RadioButton },
      'singleBulbScreen.beamRadioButton': { type: RadioButton },
      'singleBulbScreen.photonRadioButton': { type: RadioButton },
      'singleBulbScreen.flashlightButton': { type: Button },
      'singleBulbScreen.hideBrainRadioButton': { type: RadioButton },
      'singleBulbScreen.showBrainRadioButton': { type: RadioButton },
      'singleBulbScreen.filterOnOffSwitch': { type: OnOffSwitch },
      'singleBulbScreen.resetAllButton': { type: ResetAllButton },
      'singleBulbScreen.playPauseButton': { type: PlayPauseButton },
      'singleBulbScreen.stepButton': { type: Button }
    },

    {
      'rgbBulbsScreen.resetAllButton': { type: ResetAllButton },
      'rgbBulbsScreen.playPauseButton': { type: PlayPauseButton },
      'rgbBulbsScreen.stepButton': { type: Button },
      'rgbBulbsScreen.showBrainRadioButton': { type: RadioButton },
      'rgbBulbsScreen.hideBrainRadioButton': { type: RadioButton },
      'rgbBulbsScreen.redSlider': { type: Slider },
      'rgbBulbsScreen.greenSlider': { type: Slider },
      'rgbBulbsScreen.blueSlider': { type: Slider },
      'rgbBulbsScreen.redIntensity': { type: property( Number ) },
      'rgbBulbsScreen.greenIntensity': { type: property( Number ) },
      'rgbBulbsScreen.blueIntensity': { type: property( Number ) },
      'rgbBulbsScreen.playing': { type: property( Boolean ) },
      'rgbBulbsScreen.headMode': { type: property( String ) }
    }
  ] );
} );