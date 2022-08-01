// Copyright 2022, University of Colorado Boulder

/**
 * PerceivedColorSoundGenerator generates a sound that indicates the color that is being perceived by the person in the
 * model.  It mixes together sounds that correspond to the red, green, and blue levels that are being perceived.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import Utils from '../../../../dot/js/Utils.js';
import SoundClip from '../../../../tambo/js/sound-generators/SoundClip.js';
import SoundGenerator from '../../../../tambo/js/sound-generators/SoundGenerator.js';
import colorVisionAmbienceHigh_mp3 from '../../../sounds/colorVisionAmbienceHigh_mp3.js';
import colorVisionAmbienceLow_mp3 from '../../../sounds/colorVisionAmbienceLow_mp3.js';
import colorVisionAmbienceMid_mp3 from '../../../sounds/colorVisionAmbienceMid_mp3.js';
import colorVision from '../../colorVision.js';

// constants
const CONSTITUENT_SOUND_CLIP_OPTIONS = {
  loop: true
};

class PerceivedColorSoundGenerator extends SoundGenerator {

  /**
   * @param {Property.<Color|string>} perceivedColorProperty
   * @param {SoundGeneratorOptions} [options]
   */
  constructor( perceivedColorProperty, options ) {

    super( options );

    // Create sound clips for the three light ranges, i.e. R, G, and B.
    const highRangeSoundClip = new SoundClip( colorVisionAmbienceHigh_mp3, CONSTITUENT_SOUND_CLIP_OPTIONS );
    highRangeSoundClip.connect( this.masterGainNode );
    const midRangeSoundClip = new SoundClip( colorVisionAmbienceMid_mp3, CONSTITUENT_SOUND_CLIP_OPTIONS );
    midRangeSoundClip.connect( this.masterGainNode );
    const lowRangeSoundClip = new SoundClip( colorVisionAmbienceLow_mp3, CONSTITUENT_SOUND_CLIP_OPTIONS );
    lowRangeSoundClip.connect( this.masterGainNode );

    // Adjust the volume of the sound clips based on the levels of the constituent colors.
    perceivedColorProperty.link( pc => {
      adjustSoundLevel( pc.r, lowRangeSoundClip );
      adjustSoundLevel( pc.g, midRangeSoundClip );
      adjustSoundLevel( pc.b, highRangeSoundClip );
    } );
  }
}

// helper function to avoid code duplication
const adjustSoundLevel = ( colorLevel, soundClip ) => {
  const normalizedColorLevel = Utils.clamp( colorLevel / 255, 0, 1 );
  if ( normalizedColorLevel === 0 && soundClip.isPlaying ) {
    soundClip.stop();
  }
  else if ( normalizedColorLevel > 0 && !soundClip.isPlaying ) {
    soundClip.play();
  }
  soundClip.setOutputLevel( normalizedColorLevel );
};

colorVision.register( 'PerceivedColorSoundGenerator', PerceivedColorSoundGenerator );

export default PerceivedColorSoundGenerator;