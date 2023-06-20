// Copyright 2021-2022, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import type LocalizedStringProperty from '../../chipper/js/LocalizedStringProperty.js';
import colorVision from './colorVision.js';

type StringsType = {
  'filterSlider': {
    'label': string;
    'labelStringProperty': LocalizedStringProperty;
  };
  'RgbBulbsModule': {
    'title': string;
    'titleStringProperty': LocalizedStringProperty;
  };
  'color-vision': {
    'title': string;
    'titleStringProperty': LocalizedStringProperty;
  };
  'bulbSlider': {
    'label': string;
    'labelStringProperty': LocalizedStringProperty;
  };
  'SingleBulbModule': {
    'title': string;
    'titleStringProperty': LocalizedStringProperty;
  }
};

const ColorVisionStrings = getStringModule( 'COLOR_VISION' ) as StringsType;

colorVision.register( 'ColorVisionStrings', ColorVisionStrings );

export default ColorVisionStrings;
