// Copyright 2002-2014, University of Colorado Boulder

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
  var Tandem = require( 'TANDEM/Tandem' );

  // strings
  var simTitle = require( 'string!COLOR_VISION/color-vision.name' );

  var tandem = new Tandem();

  var simOptions = {
    credits: {
      leadDesign: 'Bryce Gruneich, Kathy Perkins',
      softwareDevelopment: 'Aaron Davis, Ron LeMaster, Chris Malley (PixelZoom, Inc.), Sam Reid',
      team: 'Wendy Adams, Danielle Harlow, Ariel Paul, Carl Wieman',
      qualityAssurance: 'Oliver Orejola, Amy Rouinfar, Bryan Yoelin',
      graphicArts: 'Mike Fowler'
    },
    showSmallHomeScreenIconFrame: true,
    tandem: tandem
  };

  SimLauncher.launch( function() {
    tandem = tandem.createTandem( 'colorVision' );
    var sim = new Sim( simTitle, [ new SingleBulbScreen( tandem.createTandem( 'singleBulbScreen' ) ),
      new RGBScreen( tandem.createTandem( 'rgbBulbsScreen' ) ) ], simOptions );
    sim.start();
  } );
} );