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
      leadDesign: 'Bryce Gruneich, Kathy Perkins',
      softwareDevelopment: 'Aaron Davis, Ron LeMaster, Chris Malley, Sam Reid',
      designTeam: 'Wendy Adams, Danielle Harlow, Ariel Paul, Carl Wieman',
      graphicArts: 'Mike Fowler',
      qualityAssurance: 'Oliver Orejola, Amy Rouinfar, Bryan Yoelin'
    },
    showSmallHomeScreenIconFrame: true
  };

  SimLauncher.launch( function() {
    var sim = new Sim( simTitle, [ new SingleBulbScreen(), new RGBScreen() ], simOptions );
    sim.start();
  } );
} );