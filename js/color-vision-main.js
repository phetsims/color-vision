// Copyright 2014-2024, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import soundManager from '../../tambo/js/soundManager.js';
import Tandem from '../../tandem/js/Tandem.js';
import ColorVisionStrings from './ColorVisionStrings.js';
import RGBScreen from './rgb/RGBScreen.js';
import SingleBulbScreen from './singlebulb/SingleBulbScreen.js';

const colorVisionTitleStringProperty = ColorVisionStrings[ 'color-vision' ].titleStringProperty;

const tandem = Tandem.ROOT;

const simOptions = {
  credits: {
    leadDesign: 'Bryce Gruneich, Kathy Perkins',
    softwareDevelopment: 'Aaron Davis, Ron LeMaster, Chris Malley (PixelZoom, Inc.), Sam Reid, Marla Schulz, Luisa Vargas',
    team: 'Wendy Adams, Danielle Harlow, Ariel Paul, Carl Wieman',
    qualityAssurance: 'Matthew Moore, Ashton Morris, Oliver Orejola, Amy Rouinfar, Nancy Salpepi, Kathryn Woessner Bryan Yoelin',
    graphicArts: 'Mike Fowler, Mariah Hermsmeyer, Amanda McGarry'
  }
};

simLauncher.launch( () => {
  const sim = new Sim( colorVisionTitleStringProperty, [
    new SingleBulbScreen( tandem.createTandem( 'singleBulbScreen' ) ),
    new RGBScreen( tandem.createTandem( 'rgbBulbsScreen' ) )
  ], simOptions );
  sim.start();

  // Mute the sim-specific sounds, see: https://github.com/phetsims/color-vision/issues/158
  soundManager.setOutputLevelForCategory( 'sim-specific', 0 );
} );