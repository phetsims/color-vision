// Copyright 2022, University of Colorado Boulder

/**
 * PerceivedColorSoundGenerator generates a sound that indicates the color that is being perceived by the person in the
 * model.  It mixes together sounds that correspond to the red, green, and blue levels that are being perceived.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

// TODO: There are a number of build- or run-time options in this file for different sounds.  They exists to support
//       comparisons between different options in the sound design, and should be removed once the design is finalized.
//       see https://github.com/phetsims/color-vision/issues/139.

import Utils from '../../../../dot/js/Utils.js';
import SoundClip from '../../../../tambo/js/sound-generators/SoundClip.js';
import SoundGenerator from '../../../../tambo/js/sound-generators/SoundGenerator.js';
import colorVisionHighAmbienceV2_mp3 from '../../../sounds/colorVisionHighAmbienceV2_mp3.js';
import colorVisionIndividualNotesChord01_mp3 from '../../../sounds/colorVisionIndividualNotesChord01_mp3.js';
import colorVisionIndividualNotesChord02_mp3 from '../../../sounds/colorVisionIndividualNotesChord02_mp3.js';
import colorVisionIndividualNotesChord03_mp3 from '../../../sounds/colorVisionIndividualNotesChord03_mp3.js';
import colorVisionIndividualNotesOctave01_mp3 from '../../../sounds/colorVisionIndividualNotesOctave01_mp3.js';
import colorVisionIndividualNotesOctave02_mp3 from '../../../sounds/colorVisionIndividualNotesOctave02_mp3.js';
import colorVisionIndividualNotesOctave03_mp3 from '../../../sounds/colorVisionIndividualNotesOctave03_mp3.js';
import colorVisionLowAmbienceV2_mp3 from '../../../sounds/colorVisionLowAmbienceV2_mp3.js';
import colorVisionMidAmbienceV2_mp3 from '../../../sounds/colorVisionMidAmbienceV2_mp3.js';
import colorVision from '../../colorVision.js';

// constants
const CONSTITUENT_SOUND_CLIP_OPTIONS = {
  loop: true
};

const SOUND_SETS = [
  [ colorVisionLowAmbienceV2_mp3, colorVisionMidAmbienceV2_mp3, colorVisionHighAmbienceV2_mp3 ],
  [ colorVisionIndividualNotesChord01_mp3, colorVisionIndividualNotesChord02_mp3, colorVisionIndividualNotesChord03_mp3 ],
  [ colorVisionIndividualNotesOctave01_mp3, colorVisionIndividualNotesOctave02_mp3, colorVisionIndividualNotesOctave03_mp3 ]
];

const SOUND_SET = SOUND_SETS[ 2 ];

class PerceivedColorSoundGenerator extends SoundGenerator {

  /**
   * @param {Property.<Color>} perceivedColorProperty
   * @param {SoundGeneratorOptions} [options]
   */
  constructor( perceivedColorProperty, options ) {

    super( options );

    // Create sound clips for the three light ranges, i.e. R, G, and B.
    const lowRangeSoundClip = new SoundClip( SOUND_SET[ 0 ], CONSTITUENT_SOUND_CLIP_OPTIONS );
    lowRangeSoundClip.connect( this.masterGainNode );
    const midRangeSoundClip = new SoundClip( SOUND_SET[ 1 ], CONSTITUENT_SOUND_CLIP_OPTIONS );
    midRangeSoundClip.connect( this.masterGainNode );
    const highRangeSoundClip = new SoundClip( SOUND_SET[ 2 ], CONSTITUENT_SOUND_CLIP_OPTIONS );
    highRangeSoundClip.connect( this.masterGainNode );

    // Adjust the volume of the sound clips based on the levels of the constituent colors.
    perceivedColorProperty.link( perceivedColor => {
      adjustSoundLevel( perceivedColor.r, perceivedColor.a, lowRangeSoundClip );
      adjustSoundLevel( perceivedColor.g, perceivedColor.a, midRangeSoundClip );
      adjustSoundLevel( perceivedColor.b, perceivedColor.a, highRangeSoundClip );
    } );
  }
}

// helper function to avoid code duplication
const adjustSoundLevel = ( colorLevel, alpha, soundClip ) => {
  const normalizedColorLevel = Utils.clamp( ( colorLevel * alpha ) / 255, 0, 1 );
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