/**

 Copyright 2011 Luis Montes

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

**/

 /**
 * The ResourceManager handles DOM events for use in games.
 * @name ResourceManager
 * @class ResourceManager
 */
define(['dojo/_base/declare', './shims/AudioContext'], function(declare){

  return declare(null, {
    imageCount: 0,
    loadedImages: 0,
    allLoaded: false,
    imageDir: null,
    soundsDir: null,
    audioContext: null,
    resourceList: [],
    constructor: function(args){
      declare.safeMixin(this, args);
      if(window.AudioContext){
        this.audioContext = new window.AudioContext();
      }else{
        console.log('WebAudio not supported');
      }
      
    },

    /**
      * Loads an image, and tracks if it has finished loading
      * @name ResourceManager#loadImage
      * @function
      * @param {String} filename Filename of the image relative the Game's HTML page.
      *
    */
    loadImage: function(filename){
      //if we already have the image, just return it
      for(var i = 0; i < this.resourceList.length; i++){
        if(this.resourceList[i].name === filename){
          return this.resourceList[i].img;
        }
      }

      this.allLoaded = false;

      var img = new Image();
      var imgWrapper = {
        name: filename,
        img: img,
        complete: false
      };

      if(this.imageDir){
        filename = this.imageDir + filename;
      }
      img.onload = function(){
        imgWrapper.complete = true;
      };
      img.src = filename;
      
      this.resourceList.push(imgWrapper);
      return img;
    },

    /**
      * Loads an sound file, and tracks if it has finished loading
      * @name ResourceManager#loadSound
      * @function
      * @param {String} filename Filename of the sound relative the Game's HTML page.
      *
    */
    loadSound: function(filename){

      if(this.soundsDir){
        filename = this.soundsDir + filename;
      }

      var soundObj = {
          name: filename,
          buffer: null,
          complete: false
      };

      if(this.audioContext){
        
        this.resourceList.push(soundObj);

        //if the browser AudioContext, it's new enough for XMLHttpRequest
        var request = new XMLHttpRequest();
        request.open('GET', filename, true);
        request.responseType = 'arraybuffer';

        //TODO fix scope in onload callback
        var audioContext = this.audioContext;
        // Decode asynchronously
        request.onload = function() {
          audioContext.decodeAudioData(request.response,
            function(buffer) {
              soundObj.buffer = buffer;
              soundObj.complete = true;
            },
            function(er){
              console.info('error loading sound',er);
            }
          );
        };
        request.send();

      }

      return soundObj;
    },

    /**
      * Plays a sound that was loaded from loadSound()
      * @name ResourceManager#playSound
      * @function
      * @param {Object} sound A sound object that was returned from loadSound()
      * @param {Boolean} loop whether or not to loop the sound (default: false)
      * @param {Number} noteOn The number of milliseconds from the beginning of the sound file to start (default: zero)
      *
    */
    playSound: function(sound, loop, noteOn){
      noteOn = noteOn || 0;
      if(this.audioContext && sound){
        var buffer = sound.buffer || sound;
        if(buffer){
          try{
            var source = this.audioContext.createBufferSource(); // creates a sound source
            source.buffer = buffer;                  // tell the source which sound to play
            source.connect(this.audioContext.destination);       // connect the source to the context's destination (the speakers)
            if(loop){
              source.loop = true;
            }
            source.noteOn(noteOn);                       // play the source now
            return source;
          }catch(se){
            console.info('error playing sound',se);
          }
        }
      }
    },

    /**
      * Checks whether the resources have finished loading
      * @name ResourceManager#resourcesReady
      * @function
    */
    resourcesReady: function(){
      if(this.allLoaded){
        return true;
      }else{
        for(var i = 0; i < this.resourceList.length; i++){

          if(!this.resourceList[i].complete){
            return false;
          }
        }
        this.allLoaded = true;
        return true;
      }
    },

    /**
      * Gets the percentage of resources loaded.
      * @name ResourceManager#getPercentComplete
      * @function
    */
    getPercentComplete: function(){
      var numComplete = 0.0;
      for(var i = 0; i < this.resourceList.length; i++){
        if(this.resourceList[i].complete){
          numComplete = numComplete + 1.0;
        }
      }
      if(this.resourceList.length === 0){
        return 0;
      }else{
        return Math.round((numComplete / this.resourceList.length) * 100.0);
      }
    }
  });

});
