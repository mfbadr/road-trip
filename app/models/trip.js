'use strict';

var Mongo = require('mongodb');

function Trip(o){
  this._id = Mongo.ObjectID();
  this.name = o.name[0];
  this.cash = o.cash[0] * 1;

  this.origin = {};
  this.origin.name = o.origin[0];
  this.origin.lat = o.origin[1] * 1;
  this.origin.lng = o.origin[2] * 1;
  this.destination = {};
  this.destination.name = o.destination[0];
  this.destination.lat = o.destination[1] * 1;
  this.destination.lng = o.destination[2] * 1;

  this.startDate = new Date(o.startDate[0]);
  this.endDate = new Date(o.endDate[0]);

  this.mpg = o.mpg[0] * 1;
  this.gasCost = o.gasCost[0] * 1;
  this.distance = o.distance[0] * 1;
  this.photo = [];
  //add num events, num photos, num stops all = 0
  this.numStops = 0;
  this.events = 0;
}

Object.defineProperty(Trip, 'collection', {
  get: function(){return global.mongodb.collection('trips');}
});

Trip.all = function(cb){
  Trip.collection.find().toArray(cb);
};

module.exports = Trip;

