/**
 * An Audio object that implements a generic API
 * @name AudioBase
 * @constructor AudioBase
 */

define([
  'dcl'
], function(dcl){

  'use strict';

  return dcl(null, {
    /**
     * The declared class - used for debugging in dcl
     * @type {String}
     * @memberOf AudioBase#
     * @default
     */
    declaredClass: 'frozen/sounds/AudioBase',
    /**
     * The name of the Audio object - typically the filename
     * @type {String}
     * @memberOf AudioBase#
     * @default
     */
    name: null,
    /**
     * Signals if the Audio object has completed loading
     * @type {Boolean}
     * @memberOf AudioBase#
     * @default
     */
    complete: false,

    constructor: function(filename){
      if(typeof filename === 'string'){
        this.load(filename);
      }
    },

    /**
     * Load the sound by filename
     * @function
     * @memberOf AudioBase#
     * @param  {String} filename The filename of the file to load
     */
    load: function(filename){
      this.name = filename;
      this.complete = true;
    },

    /**
     * Loop the sound at a certain volume
     * @function
     * @memberOf AudioBase#
     * @param  {Number} volume Value of volume - between 0 and 1
     */
    loop: function(volume){},

    /**
     * Play the sound at a certain volume and start time
     * @function
     * @memberOf AudioBase#
     * @param  {Number} volume    Value of volume - between 0 and 1
     * @param  {Number} startTime Value of milliseconds into the track to start
     */
    play: function(volume, startTime){},

    /**
     * Method used to construct Audio objects internally
     * @function
     * @memberOf AudioBase#
     * @private
     * @param  {Number} volume Value of volume - between 0 and 1
     * @param  {Boolean} loop Whether or not to loop audio
     * @return {Audio} Audio object that was constructed
     */
    _initAudio: function(volume, loop){}
  });

});