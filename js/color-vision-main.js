// Copyright 2014-2015, University of Colorado Boulder

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
  var colorVisionTitleString = require( 'string!COLOR_VISION/color-vision.title' );

  var tandem = Tandem.createRootTandem();

  var simOptions = {
    credits: {
      leadDesign: 'Bryce Gruneich, Kathy Perkins',
      softwareDevelopment: 'Aaron Davis, Ron LeMaster, Chris Malley (PixelZoom, Inc.), Sam Reid',
      team: 'Wendy Adams, Danielle Harlow, Ariel Paul, Carl Wieman',
      qualityAssurance: 'Oliver Orejola, Amy Rouinfar, Bryan Yoelin',
      graphicArts: 'Mike Fowler'
    },
    showSmallHomeScreenIconFrame: true
  };

  SimLauncher.launch( function() {
    var sim = new Sim( colorVisionTitleString, [
      new SingleBulbScreen( tandem.createTandem( 'singleBulbScreen' ) ),
      new RGBScreen( tandem.createTandem( 'rgbBulbsScreen' ) )
    ], simOptions );
    sim.start();
  } );
} );