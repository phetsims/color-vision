// Copyright 2014-2020, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import colorVisionStrings from './colorVisionStrings.js';
import RGBScreen from './rgb/RGBScreen.js';
import SingleBulbScreen from './singlebulb/SingleBulbScreen.js';

const colorVisionTitleString = colorVisionStrings[ 'color-vision' ].title;

const tandem = Tandem.ROOT;

const simOptions = {
  credits: {
    leadDesign: 'Bryce Gruneich, Kathy Perkins',
    softwareDevelopment: 'Aaron Davis, Ron LeMaster, Chris Malley (PixelZoom, Inc.), Sam Reid',
    team: 'Wendy Adams, Danielle Harlow, Ariel Paul, Carl Wieman',
    qualityAssurance: 'Oliver Orejola, Amy Rouinfar, Bryan Yoelin',
    graphicArts: 'Mike Fowler'
  }
};

simLauncher.launch( function() {
  const sim = new Sim( colorVisionTitleString, [
    new SingleBulbScreen( tandem.createTandem( 'singleBulbScreen' ) ),
    new RGBScreen( tandem.createTandem( 'rgbBulbsScreen' ) )
  ], simOptions );
  sim.start();
} );