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
    'labelProperty': TReadOnlyProperty<string>;
  };
  'RgbBulbsModule': {
    'title': string;
    'titleProperty': TReadOnlyProperty<string>;
  };
  'color-vision': {
    'title': string;
    'titleProperty': TReadOnlyProperty<string>;
  };
  'bulbSlider': {
    'label': string;
    'labelProperty': TReadOnlyProperty<string>;
  };
  'SingleBulbModule': {
    'title': string;
    'titleProperty': TReadOnlyProperty<string>;
  }
};

const colorVisionStrings = getStringModule( 'COLOR_VISION' ) as StringsType;

colorVision.register( 'colorVisionStrings', colorVisionStrings );

export default colorVisionStrings;
