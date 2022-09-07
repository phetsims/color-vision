// Copyright 2021-2022, University of Colorado Boulder

/**
 * Auto-generated from modulify, DO NOT manually modify.
 */
/* eslint-disable */
import getStringModule from '../../chipper/js/getStringModule.js';
import TReadOnlyProperty from '../../axon/js/TReadOnlyProperty.js';
import colorVision from './colorVision.js';

type StringsType = {
  'filterSlider': {
    'label': string;
    'labelStringProperty': TReadOnlyProperty<string>;
  };
  'RgbBulbsModule': {
    'title': string;
    'titleStringProperty': TReadOnlyProperty<string>;
  };
  'color-vision': {
    'title': string;
    'titleStringProperty': TReadOnlyProperty<string>;
  };
  'bulbSlider': {
    'label': string;
    'labelStringProperty': TReadOnlyProperty<string>;
  };
  'SingleBulbModule': {
    'title': string;
    'titleStringProperty': TReadOnlyProperty<string>;
  }
};

const ColorVisionStrings = getStringModule( 'COLOR_VISION' ) as StringsType;

colorVision.register( 'ColorVisionStrings', ColorVisionStrings );

export default ColorVisionStrings;
