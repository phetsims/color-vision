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
  var Range = require( 'DOT/Range' );
  var RGBConstants = require( 'COLOR_VISION/rgb/RGBConstants' );
  var RGBPhotonBeam = require( 'COLOR_VISION/rgb/model/RGBPhotonBeam' );
  var RGBPhotonEventModel = require( 'COLOR_VISION/rgb/model/RGBPhotonEventModel' );
  var TColor = require( 'SCENERY/util/TColor' );
  var Property = require( 'AXON/Property' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );

  // phet-io modules
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );
  var TString = require( 'ifphetio!PHET_IO/types/TString' );

  // constants
  var PERCENT_RANGE = new Range( 0, 100 );
  var COLOR_SCALE_FACTOR = 2.55; // for multiplying a percent by to get an rgb color intensity

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function RGBModel( tandem ) {

    // @public {Property.<boolean>} is the model running?
    this.playingProperty = new Property( true, {
      tandem: tandem.createTandem( 'playingProperty' ),
      phetioValueType: TBoolean
    } );

    // @public {Property.<string>} which head view to show
    this.headModeProperty = new Property( 'no-brain', {
      validValues: [ 'brain', 'no-brain' ],
      tandem: tandem.createTandem( 'headModeProperty' ),
      phetioValueType: TString
    } );

    // @public
    // The values of the properties redIntensity, greenIntensity, and blueIntensity are determined
    // from the sliders, and determine the density of the photons coming out of the flashlights.
    // Range is 0-100.
    this.redIntensityProperty = new Property( 0, {
      tandem: tandem.createTandem( 'redIntensityProperty' ),
      phetioValueType: TNumber( { units: 'percent', range: PERCENT_RANGE } )
    } );
    this.greenIntensityProperty = new Property( 0, {
      tandem: tandem.createTandem( 'greenIntensityProperty' ),
      phetioValueType: TNumber( { units: 'percent', range: PERCENT_RANGE } )
    } );
    this.blueIntensityProperty = new Property( 0, {
      tandem: tandem.createTandem( 'blueIntensityProperty' ),
      phetioValueType: TNumber( { units: 'percent', range: PERCENT_RANGE } )
    } );

    // @private
    // The perceivedIntensity properties determine the color of the thought bubbles.
    // They are calculated by taking the intensity value of the most recent photon to
    // reach the end of the photon beam (the person's eye). Each photon keeps a record of the
    // intensity for this reason, even though it is not used in determining intensity of the
    // photon itself, which is constant.
    // Range is 0-100.
    this.perceivedRedIntensityProperty = new Property( 0, {
      tandem: tandem.createTandem( 'perceivedRedIntensityProperty' ),
      phetioValueType: TNumber( { units: 'percent', range: PERCENT_RANGE } )
    } );
    this.perceivedGreenIntensityProperty = new Property( 0, {
      value: 0,
      tandem: tandem.createTandem( 'perceivedGreenIntensityProperty' ),
      phetioValueType: TNumber( { units: 'percent', range: PERCENT_RANGE } )
    } );
    this.perceivedBlueIntensityProperty = new Property( 0, {
      value: 0,
      tandem: tandem.createTandem( 'perceivedBlueIntensityProperty' ),
      phetioValueType: TNumber( { units: 'percent', range: PERCENT_RANGE } )
    } );

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

    // @public {Property.<Color|string>}
    // based on the combination of the three perceived intensities, this determines the thought bubble color
    this.perceivedColorProperty = new DerivedProperty( [
        this.perceivedRedIntensityProperty,
        this.perceivedGreenIntensityProperty,
        this.perceivedBlueIntensityProperty
      ],
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

  return inherit( Object, RGBModel, {

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
      
      // Cap DT, see https://github.com/phetsims/color-vision/issues/115 and https://github.com/phetsims/joist/issues/130
      dt = Math.min( dt, 0.5 );

      if ( this.playingProperty.value ) {
        this.stepBeams( dt );
        this.stepTimers( dt );
      }
    },

    // @public step one frame, assuming 60fps
    manualStep: function() {
      this.stepBeams( 1 / 60 );
      this.stepTimers( 1 / 60 );
    },

    // @public
    reset: function() {

      this.playingProperty.reset();
      this.headModeProperty.reset();
      this.redIntensityProperty.reset();
      this.greenIntensityProperty.reset();
      this.blueIntensityProperty.reset();
      this.perceivedRedIntensityProperty.reset();
      this.perceivedGreenIntensityProperty.reset();
      this.perceivedBlueIntensityProperty.reset();

      this.redBeam.reset();
      this.greenBeam.reset();
      this.blueBeam.reset();
    }

  } );
} );

