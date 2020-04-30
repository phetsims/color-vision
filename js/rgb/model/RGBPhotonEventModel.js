// Copyright 2014-2020, University of Colorado Boulder

/**
 * RGBPhotonEventModel
 *
 * @author Aaron Davis (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import inherit from '../../../../phet-core/js/inherit.js';
import colorVision from '../../colorVision.js';

/*
 * Event model that will fire events at a variable rate. An event will occur every 1/rate time units.
 * @param {Property.<number>} rateProperty
 * @constructor
 */
function RGBPhotonEventModel( rateProperty ) {
  assert && assert( rateProperty instanceof Property, 'The rateProperty should be a Property' );

  this.rateProperty = rateProperty; // @private
}

colorVision.register( 'RGBPhotonEventModel', RGBPhotonEventModel );

inherit( Object, RGBPhotonEventModel, {

  getPeriodBeforeNextEvent: function() {
    const rate = this.rateProperty.get() * 2;
    assert && assert( rate >= 0, 'We need to have a non-negative rate in order to prevent infinite loops.' );

    // make sure that a 0 rate doesn't fire an event
    if ( rate === 0 ) {
      return Number.POSITIVE_INFINITY;
    }
    else {
      return 1 / rate;
    }
  }

} );

export default RGBPhotonEventModel;