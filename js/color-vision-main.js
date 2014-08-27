//  Copyright 2002-2014, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var RGBScreen = require( 'COLOR_VISION/rgb/RGBScreen' );
  var SingleBulbScreen = require( 'COLOR_VISION/singlebulb/SingleBulbScreen' );
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
      interviews: 'Bryce Gruneich',
      graphicArts: 'Mike Fowler',
      qualityAssurance: 'Amy Rouinfar, Oliver Orejola, Bryan Yoelin'
    },
    showSmallHomeScreenIconFrame: true
  };

  SimLauncher.launch( function() {
    var sim = new Sim( simTitle, [ new SingleBulbScreen(), new RGBScreen() ], simOptions );
    sim.start();
  } );
} );