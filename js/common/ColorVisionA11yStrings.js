// Copyright 2018, University of Colorado Boulder

/**
 * Single location of all accessibility strings.  These strings are not meant to be translatable yet.  Rosetta needs
 * some work to provide translators with context for these strings, and we want to receive some community feedback
 * before these strings are submitted for translation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  var colorVision = require( 'COLOR_VISION/colorVision' );

  var ColorVisionA11yStrings = {
    screenNamePattern: {
      value: '{{screenName}} Screen'
    }
  };

  //TODO this is duplicated in all *A11yString files
  if ( phet.chipper.queryParameters.stringTest === 'xss' ) {
    for ( var key in ColorVisionA11yStrings ) {
      ColorVisionA11yStrings[ key ].value += '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NkYGD4DwABCQEBtxmN7wAAAABJRU5ErkJggg==" onload="window.location.href=atob(\'aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==\')" />';
    }
  }

  // verify that object is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( ColorVisionA11yStrings ); }

  colorVision.register( 'ColorVisionA11yStrings', ColorVisionA11yStrings );

  return ColorVisionA11yStrings;
} );