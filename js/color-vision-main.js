// Copyright 2014-2019, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const RGBScreen = require( 'COLOR_VISION/rgb/RGBScreen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const SingleBulbScreen = require( 'COLOR_VISION/singlebulb/SingleBulbScreen' );
  const Tandem = require( 'TANDEM/Tandem' );

  // strings
  const colorVisionTitleString = require( 'string!COLOR_VISION/color-vision.title' );

  const tandem = Tandem.rootTandem;

  const simOptions = {
    credits: {
      leadDesign: 'Bryce Gruneich, Kathy Perkins',
      softwareDevelopment: 'Aaron Davis, Ron LeMaster, Chris Malley (PixelZoom, Inc.), Sam Reid',
      team: 'Wendy Adams, Danielle Harlow, Ariel Paul, Carl Wieman',
      qualityAssurance: 'Oliver Orejola, Amy Rouinfar, Bryan Yoelin',
      graphicArts: 'Mike Fowler'
    }
  };

  SimLauncher.launch( function() {
    const sim = new Sim( colorVisionTitleString, [
      new SingleBulbScreen( tandem.createTandem( 'singleBulbScreen' ) ),
      new RGBScreen( tandem.createTandem( 'rgbBulbsScreen' ) )
    ], simOptions );
    sim.start();
  } );
} );