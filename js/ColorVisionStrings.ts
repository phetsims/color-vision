// Copyright 2021-2024, University of Colorado Boulder

/* eslint-disable */
/* @formatter:off */

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */

import getStringModule from '../../chipper/js/browser/getStringModule.js';
import type LocalizedStringProperty from '../../chipper/js/browser/LocalizedStringProperty.js';
import colorVision from './colorVision.js';

type StringsType = {
  'filterSlider': {
    'labelStringProperty': LocalizedStringProperty;
  };
  'RgbBulbsModule': {
    'titleStringProperty': LocalizedStringProperty;
  };
  'color-vision': {
    'titleStringProperty': LocalizedStringProperty;
  };
  'bulbSlider': {
    'labelStringProperty': LocalizedStringProperty;
  };
  'SingleBulbModule': {
    'titleStringProperty': LocalizedStringProperty;
  };
  'valuePercentPatternStringProperty': LocalizedStringProperty;
  'redStringProperty': LocalizedStringProperty;
  'greenStringProperty': LocalizedStringProperty;
  'blueStringProperty': LocalizedStringProperty;
  'redLightStringProperty': LocalizedStringProperty;
  'greenLightStringProperty': LocalizedStringProperty;
  'blueLightStringProperty': LocalizedStringProperty;
  'a11y': {
    'flashlightStringProperty': LocalizedStringProperty;
    'filterStringProperty': LocalizedStringProperty;
    'viewerRepresentationStringProperty': LocalizedStringProperty;
    'lightOutputTypesStringProperty': LocalizedStringProperty;
    'lightRepresentationModesStringProperty': LocalizedStringProperty;
  }
};

const ColorVisionStrings = getStringModule( 'COLOR_VISION' ) as StringsType;

colorVision.register( 'ColorVisionStrings', ColorVisionStrings );

export default ColorVisionStrings;
