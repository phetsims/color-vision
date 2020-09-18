// Copyright 2017-2020, University of Colorado Boulder

/**
 * IO Type for RGBPhoton.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */

import Vector2IO from '../../../../dot/js/Vector2IO.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import colorVision from '../../colorVision.js';
import RGBPhoton from './RGBPhoton.js';

const RGBPhotonIO = new IOType( 'RGBPhotonIO', {
  valueType: RGBPhoton,
  documentation: 'A Photon that has R, G, and B',
  toStateObject( rgbPhoton ) {
    return {
      position: Vector2IO.toStateObject( rgbPhoton.position ),
      velocity: Vector2IO.toStateObject( rgbPhoton.velocity ),
      intensity: rgbPhoton.intensity
    };
  },
  fromStateObject( stateObject ) {
    return new RGBPhoton(
      Vector2IO.fromStateObject( stateObject.position ),
      Vector2IO.fromStateObject( stateObject.velocity ),
      stateObject.intensity
    );
  }
} );

colorVision.register( 'RGBPhotonIO', RGBPhotonIO );
export default RGBPhotonIO;
