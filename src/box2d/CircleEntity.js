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
 * This represents a Circly body and shape in a Box2d world
 * @name CircleEntity
 * @class CircleEntity
 * @memberOf box2d
 * @extends Entity
 */

define([
  'dojo/_base/declare',
  './Entity'
], function(declare, Entity){

  return declare([Entity], {
    radius: 1,
    constructor: function(/* Object */args){
      declare.safeMixin(this, args);
    },

    /**
      * Draws the Entity at a given scale
      * @name CircleEntity#draw
      * @function
    */
    draw: function(ctx, scale){
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x * scale, this.y * scale, this.radius * scale, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#000000';
      ctx.beginPath();
      ctx.arc(this.x * scale, this.y * scale, this.radius * scale, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.stroke();

      this.inherited(arguments);
    }
  });

});