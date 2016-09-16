// Copyright 2015-2016, University of Colorado Boulder

/**
 * This is the public API for the color-vision sim.  It can be used in concert with phetio.js and phetioEvents.js for API
 * simulation features.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
// Permit uppercase function names, such as TProperty(string)
define( function( require ) {
  'use strict';

  // modules
  var phetio = require( 'PHET_IO/phetio' );
  var phetioNamespace = require( 'PHET_IO/phetioNamespace' );
  var Tandem = require( 'TANDEM/Tandem' );
  var TArray = require( 'PHET_IO/types/TArray' );
  var TBoolean = require( 'PHET_IO/types/TBoolean' );
  var TPushButton = require( 'PHET_IO/types/sun/buttons/TPushButton' );
  var TColor = require( 'PHET_IO/types/scenery/util/TColor' );
  var TDerivedProperty = require( 'PHET_IO/types/axon/TDerivedProperty' );
  var THSlider = require( 'PHET_IO/types/sun/THSlider' );
  var TNumber = require( 'PHET_IO/types/TNumber' );
  var TOnOffSwitch = require( 'PHET_IO/types/sun/TOnOffSwitch' );
  var TPhotonView = require( 'PHET_IO/simulations/color-vision/TPhotonView' );
  var TProperty = require( 'PHET_IO/types/axon/TProperty' );
  var TRadioButton = require( 'PHET_IO/types/sun/TRadioButton' );
  var TResetAllButton = require( 'PHET_IO/types/sun/buttons/TResetAllButton' );
  var TRGBPhoton = require( 'PHET_IO/simulations/color-vision/TRGBPhoton' );
  var TSingleBulbPhoton = require( 'PHET_IO/simulations/color-vision/TSingleBulbPhoton' );
  var TString = require( 'PHET_IO/types/TString' );
  var TTandemText = require( 'PHET_IO/types/tandem/scenery/nodes/TTandemText' );
  var TToggleButton = require( 'PHET_IO/types/sun/buttons/TToggleButton' );
  var TWavelengthSlider = require( 'PHET_IO/types/scenery-phet/TWavelengthSlider' );

  var colorVisionAPI = ( {

    colorVision: ( {

      singleBulbScreen: {
        model: {
          lightTypeProperty: TProperty( TString ),
          beamTypeProperty: TProperty( TString ),

          playingProperty: TProperty( TBoolean ),
          headModeProperty: TProperty( TString ),
          photonBeam: {
            photons: TArray( TSingleBulbPhoton )
          },
          flashlight: {
            flashlightWavelengthProperty: TProperty( TNumber( { units: 'nanometers' } ) ),

            flashlightOnProperty: TProperty( TBoolean )
          },
          filter: {
            filterWavelengthProperty: TProperty( TNumber( { units: 'nanometers' } ) ),
            filterVisibleProperty: TProperty( TBoolean )
          }
        },
        view: {
          bulbColorSlider: TWavelengthSlider,
          bulbColorText: TTandemText,
          whiteLightRadioButton: TRadioButton( TString ),
          coloredLightRadioButton: TRadioButton( TString ),
          beamRadioButton: TRadioButton( TString ),
          photonRadioButton: TRadioButton( TString ),
          headNode: {
            hideBrainRadioButton: TRadioButton( TString ),
            showBrainRadioButton: TRadioButton( TString )
          },

          resetAllButton: TResetAllButton,
          playPauseButton: TToggleButton( TBoolean ),
          stepButton: TPushButton,
          gaussianSlider: TWavelengthSlider,
          filterWireNode: {
            onOffSwitch: TOnOffSwitch
          },
          flashlightNode: {
            button: TToggleButton( TBoolean )
          },
          photonBeamNode: TPhotonView
        }
      },
      rgbBulbsScreen: {
        model: {
          redIntensityProperty: TProperty( TNumber() ),
          greenIntensityProperty: TProperty( TNumber() ),
          blueIntensityProperty: TProperty( TNumber() ),
          perceivedRedIntensityProperty: TProperty( TNumber() ),
          perceivedGreenIntensityProperty: TProperty( TNumber() ),
          perceivedBlueIntensityProperty: TProperty( TNumber() ),
          playingProperty: TProperty( TBoolean ),
          headModeProperty: TProperty( TString ),
          perceivedColor: TDerivedProperty( TColor ),
          redBeam: {
            photons: TArray( TRGBPhoton )
          },
          greenBeam: {
            photons: TArray( TRGBPhoton )
          },
          blueBeam: {
            photons: TArray( TRGBPhoton )
          }
        },
        view: {
          resetAllButton: TResetAllButton,
          playPauseButton: TToggleButton( TBoolean ),
          stepButton: TPushButton,
          headNode: {
            showBrainRadioButton: TRadioButton( TString ),
            hideBrainRadioButton: TRadioButton( TString )
          },
          redSlider: THSlider,
          greenSlider: THSlider,
          blueSlider: THSlider,
          redBeam: TPhotonView,
          greenBeam: TPhotonView,
          blueBeam: TPhotonView
        }
      }
    } )
  } );

  phetioNamespace.register( 'color-vision-api', colorVisionAPI );

  // Set the phetio.api after it was declared
  phetio.api = colorVisionAPI;

  window.api = colorVisionAPI;

  // Register phetio as a tandem instance after API assigned
  new Tandem( 'phetio' ).addInstance( phetio );

  return colorVisionAPI;
} );

