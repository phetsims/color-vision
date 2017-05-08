// Copyright 2014-2015, University of Colorado Boulder

/**
 * Model for 'RGB' screen
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var colorVision = require( 'COLOR_VISION/colorVision' );
  var EventTimer = require( 'PHET_CORE/EventTimer' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Range = require( 'DOT/Range' );
  var RGBConstants = require( 'COLOR_VISION/rgb/RGBConstants' );
  var RGBPhotonBeam = require( 'COLOR_VISION/rgb/model/RGBPhotonBeam' );
  var RGBPhotonEventModel = require( 'COLOR_VISION/rgb/model/RGBPhotonEventModel' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );
  var TColor = require( 'PHET_IO/types/scenery/util/TColor' );
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );
  var TString = require( 'ifphetio!PHET_IO/types/TString' );

  var PERCENT_RANGE = new Range( 0, 100 );

  // constants
  var COLOR_SCALE_FACTOR = 2.55; // for multiplying a percent by to get an rgb color intensity

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function RGBModel( tandem ) {

    /**
     * RGBModel contains 6 intensity properties, all of which range between 0-100.
     *
     * The values of the properties redIntensity, greenIntensity, and blueIntensity are determined
     * from the sliders, and indicate the density of the photons coming out of the flashlights.
     *
     * The perceivedIntensity properties determine the color of the thought
     * bubbles. They are calculated by taking the intensity value of the most recent photon to
     * reach the end of the photon beam (the person's eye). Each photon keeps a record of the
     * intensity for this reason, even though it is not used in determining intensity of the
     * photon itself, which is constant.
     */
    var properties = {

      // @public
      redIntensity: {
        value: 0,
        tandem: tandem.createTandem( 'redIntensityProperty' ),
        phetioValueType: TNumber( { units: 'percent', range: PERCENT_RANGE } )
      },
      greenIntensity: {
        value: 0,
        tandem: tandem.createTandem( 'greenIntensityProperty' ),
        phetioValueType: TNumber( { units: 'percent', range: PERCENT_RANGE } )
      },
      blueIntensity: {
        value: 0,
        tandem: tandem.createTandem( 'blueIntensityProperty' ),
        phetioValueType: TNumber( { units: 'percent', range: PERCENT_RANGE } )
      },
      playing: {
        value: true, // is the sim running or paused?
        tandem: tandem.createTandem( 'playingProperty' ),
        phetioValueType: TBoolean
      },
      headMode: {
        value: 'no-brain', // takes values 'brain' or 'no-brain'
        tandem: tandem.createTandem( 'headModeProperty' ),
        phetioValueType: TString
      },

      // @private
      perceivedRedIntensity: {
        value: 0,
        tandem: tandem.createTandem( 'perceivedRedIntensityProperty' ),
        phetioValueType: TNumber( { units: 'percent', range: PERCENT_RANGE } )
      },
      perceivedGreenIntensity: {
        value: 0,
        tandem: tandem.createTandem( 'perceivedGreenIntensityProperty' ),
        phetioValueType: TNumber( { units: 'percent', range: PERCENT_RANGE } )
      },
      perceivedBlueIntensity: {
        value: 0,
        tandem: tandem.createTandem( 'perceivedBlueIntensityProperty' ),
        phetioValueType: TNumber( { units: 'percent', range: PERCENT_RANGE } )
      }
    };

    PropertySet.call( this, null, properties );

    // @private
    this.redBeam = new RGBPhotonBeam(
      '#ff0000',
      this.redIntensityProperty,
      this.perceivedRedIntensityProperty,
      RGBConstants.RED_BEAM_LENGTH,
      tandem.createTandem( 'redBeam' ) );
    this.greenBeam = new RGBPhotonBeam(
      '#00ff00',
      this.greenIntensityProperty,
      this.perceivedGreenIntensityProperty,
      RGBConstants.GREEN_BEAM_LENGTH,
      tandem.createTandem( 'greenBeam' ) );
    this.blueBeam = new RGBPhotonBeam(
      '#0000ff',
      this.blueIntensityProperty,
      this.perceivedBlueIntensityProperty,
      RGBConstants.BLUE_BEAM_LENGTH,
      tandem.createTandem( 'blueBeam' ) );

    var self = this;

    // add perceivedColorProperty based on the combination of the three perceived intensities.
    // this determines the thought bubble color
    // @public
    this.addDerivedProperty( 'perceivedColor', [ 'perceivedRedIntensity', 'perceivedGreenIntensity', 'perceivedBlueIntensity' ],
      function( redIntensity, greenIntensity, blueIntensity ) {
        return new Color(
          Math.floor( redIntensity * COLOR_SCALE_FACTOR ),
          Math.floor( greenIntensity * COLOR_SCALE_FACTOR ),
          Math.floor( blueIntensity * COLOR_SCALE_FACTOR ) );
      }, {
        tandem: tandem.createTandem( 'perceivedColorProperty' ),
        phetioValueType: TColor
      } );

    // create a ConstantEventModel for each beam
    var redEventModel = new RGBPhotonEventModel( this.redIntensityProperty );
    var greenEventModel = new RGBPhotonEventModel( this.greenIntensityProperty );
    var blueEventModel = new RGBPhotonEventModel( this.blueIntensityProperty );

    // create an EventTimer for each beam, used to regulate when to create new photons for each beam
    // @private
    this.redEventTimer = new EventTimer( redEventModel, function( timeElapsed ) {
      self.redBeam.createPhoton( timeElapsed );
    } );

    // @private
    this.greenEventTimer = new EventTimer( greenEventModel, function( timeElapsed ) {
      self.greenBeam.createPhoton( timeElapsed );
    } );

    // @private
    this.blueEventTimer = new EventTimer( blueEventModel, function( timeElapsed ) {
      self.blueBeam.createPhoton( timeElapsed );
    } );

    // link the intensity of each beam to the rate of their event timers
    // we need to 0 out the timeBeforeNextEvent, otherwise there is a long delay in seeing the first photon from
    // the time when the slider is initially moved.
    this.redIntensityProperty.link( function() { self.redEventTimer.timeBeforeNextEvent = 0; } );
    this.greenIntensityProperty.link( function() { self.greenEventTimer.timeBeforeNextEvent = 0; } );
    this.blueIntensityProperty.link( function() { self.blueEventTimer.timeBeforeNextEvent = 0; } );
  }

  colorVision.register( 'RGBModel', RGBModel );

  return inherit( PropertySet, RGBModel, {

    // @private
    // convenience method for stepping all of the beams at once, used in step and manualStep
    stepBeams: function( timeElapsed ) {
      this.redBeam.updateAnimationFrame( timeElapsed );
      this.greenBeam.updateAnimationFrame( timeElapsed );
      this.blueBeam.updateAnimationFrame( timeElapsed );
    },

    // @private
    // convenience method for stepping all of the timers at once
    stepTimers: function( dt ) {
      this.redEventTimer.step( dt );
      this.greenEventTimer.step( dt );
      this.blueEventTimer.step( dt );
    },

    // @public
    step: function( dt ) {
      dt = Math.min( dt, 0.5 ); // Cap DT, see https://github.com/phetsims/color-vision/issues/115 and https://github.com/phetsims/joist/issues/130
      if ( this.playing ) {
        this.stepBeams( dt );
        this.stepTimers( dt );
      }
    },

    // step one frame, assuming 60fps
    // @public
    manualStep: function() {
      this.stepBeams( 1 / 60 );
      this.stepTimers( 1 / 60 );
    },

    // @public
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.redBeam.reset();
      this.greenBeam.reset();
      this.blueBeam.reset();
    }

  } );
} );

