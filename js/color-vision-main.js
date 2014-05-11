//  Copyright 2002-2014, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // imports
  var ColorVisionScreen = require( 'COLOR_VISION/view/ColorVisionScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var simTitle = require( 'string!COLOR_VISION/color-vision.name' );

  var simOptions = {
    credits: {
      // all credits fields are optional
      leadDesign: 'Bryce Gruneich',
      softwareDevelopment: 'Aaron Davis (lead developer), Sam Reid',
      designTeam: 'Ariel Paul, Kathy Perkins',
      interviews: 'Bryce Gruneich'
    }
  };

  // Appending '?dev' to the URL will enable developer-only features.
  if ( window.phetcommon.getQueryParameter( 'dev' ) ) {
    simOptions = _.extend( {
      // add dev-specific options here
    }, simOptions );
  }

  SimLauncher.launch( function() {
    var sim = new Sim( simTitle, [ new ColorVisionScreen() ], simOptions );
    sim.start();
  } );
} );