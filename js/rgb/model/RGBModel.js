// Copyright 2002-2014, University of Colorado Boulder

/**
 * Model for 'RGB' screen
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var RGBPhotonBeam = require( 'COLOR_VISION/rgb/model/RGBPhotonBeam' );
  var RGBPhotonEventModel = require( 'COLOR_VISION/rgb/model/RGBPhotonEventModel' );
  var RGBConstants = require( 'COLOR_VISION/rgb/RGBConstants' );
  var EventTimer = require( 'PHET_CORE/EventTimer' );

  // constants
  var COLOR_SCALE_FACTOR = 2.55; // for multiplying a percent by to get an rgb color intensity

  /**
   * @constructor
   */
  function RGBModel() {

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
    PropertySet.call( this, {
        redIntensity: 0,
        greenIntensity: 0,
        blueIntensity: 0,
        perceivedRedIntensity: 0,
        perceivedGreenIntensity: 0,
        perceivedBlueIntensity: 0,
        playing: true,       // is the sim running or paused?
        headMode: 'no-brain' // takes values 'brain' or 'no-brain'
      }
    );

    this.redBeam = new RGBPhotonBeam( '#ff0000', this.redIntensityProperty, this.perceivedRedIntensityProperty, RGBConstants.RED_BEAM_LENGTH );
    this.greenBeam = new RGBPhotonBeam( '#00ff00', this.greenIntensityProperty, this.perceivedGreenIntensityProperty, RGBConstants.GREEN_BEAM_LENGTH );
    this.blueBeam = new RGBPhotonBeam( '#0000ff', this.blueIntensityProperty, this.perceivedBlueIntensityProperty, RGBConstants.BLUE_BEAM_LENGTH );

    var thisModel = this;

    // add perceivedColorProperty based on the combination of the three perceived intensities.
    // this determines the thought bubble color
    this.addDerivedProperty( 'perceivedColor', [ 'perceivedRedIntensity', 'perceivedGreenIntensity', 'perceivedBlueIntensity' ],
      function( redIntensity, greenIntensity, blueIntensity ) {
        return 'rgb(' + [
            Math.floor( redIntensity * COLOR_SCALE_FACTOR ),
            Math.floor( greenIntensity * COLOR_SCALE_FACTOR ),
            Math.floor( blueIntensity * COLOR_SCALE_FACTOR ) ].join() + ')';
      } );

    // create a ConstantEventModel for each beam
    this.redEventModel = new RGBPhotonEventModel( this.redIntensityProperty );
    this.greenEventModel = new RGBPhotonEventModel( this.greenIntensityProperty );
    this.blueEventModel = new RGBPhotonEventModel( this.blueIntensityProperty );

    // create an EventTimer for each beam, used to regulate when to create new photons for each beam
    this.redEventTimer = new EventTimer( this.redEventModel, function( timeElapsed ) {
      thisModel.redBeam.createPhoton( timeElapsed );
    } );

    this.greenEventTimer = new EventTimer( this.greenEventModel, function( timeElapsed ) {
      thisModel.greenBeam.createPhoton( timeElapsed );
    } );

    this.blueEventTimer = new EventTimer( this.blueEventModel, function( timeElapsed ) {
      thisModel.blueBeam.createPhoton( timeElapsed );
    } );

    // link the intensity of each beam to the rate of their event timers
    // we need to 0 out the timeBeforeNextEvent, otherwise there is a long delay in seeing the first photon from
    // the time when the slider is initially moved.
    this.redIntensityProperty.link( function() { thisModel.redEventTimer.timeBeforeNextEvent = 0; } );
    this.greenIntensityProperty.link( function() { thisModel.greenEventTimer.timeBeforeNextEvent = 0; } );
    this.blueIntensityProperty.link( function() { thisModel.blueEventTimer.timeBeforeNextEvent = 0; } );

    //together && together.addComponent( this.redIntensityProperty, 'rgbBulbsScreen.redIntensity' );
    //together && together.addComponent( this.greenIntensityProperty, 'rgbBulbsScreen.greenIntensity' );
    //together && together.addComponent( this.blueIntensityProperty, 'rgbBulbsScreen.blueIntensity' );
    //together && together.addComponent( this.playProperty, 'rgbBulbsScreen.playing' );
    //together && together.addComponent( this.headModeProperty, 'rgbBulbsScreen.headMode' );
  }

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

    step: function( dt ) {
      if ( this.play ) {
        this.stepBeams( dt );
        this.stepTimers( dt );
      }
    },

    // step one frame, assuming 60fps
    manualStep: function() {
      this.stepBeams( 1 / 60 );
      this.stepTimers( 1 / 60 );
    },

    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.redBeam.reset();
      this.greenBeam.reset();
      this.blueBeam.reset();
    }

  } );
} );
