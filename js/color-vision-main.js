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

const colorVisionTitleStringProperty = colorVisionStrings[ 'color-vision' ].titleStringProperty;

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

simLauncher.launch( () => {
  const sim = new Sim( colorVisionTitleStringProperty, [
    new SingleBulbScreen( tandem.createTandem( 'singleBulbScreen' ) ),
    new RGBScreen( tandem.createTandem( 'rgbBulbsScreen' ) )
  ], simOptions );
  sim.start();
} );