'use strict';

var Mongo = require('mongodb'),
    _     = require('lodash'),
    fs    = require('fs'),
    path  = require('path');

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
  this.photo = 0;
  //add num events, num photos, num stops all = 0
  this.numStops = 0;
  this.events = 0;
}

//Trip.create
Trip.prototype.moveFile = function(files){
  var baseDir = __dirname + '/../static', //absolute path to static directory
      relDir  = '/img/' + this._id, //rel path to img from browset
      absDir  = baseDir + relDir; // abs path to /img/id

  fs.mkdirSync(absDir); //creates /img/id

  var photos = files.carPhoto.map(function(photo, index){
    if(!photo.size){return;} //makes sure there is a photo

    var ext = path.extname(photo.path), //pulls ext
      name = index + ext, //eg 0.jpg
      absPath = absDir + '/' + name, //abs path to file
      relPath = relDir + '/' + name; // rel path to file

    fs.renameSync(photo.path, absPath); //moves photo to dir //moves photo to dir
    return relPath; //returns rel path to new arrap
  });
  photos = _.compact(photos);
  this.photo = photos[0];
};

Object.defineProperty(Trip, 'collection', {
  get: function(){return global.mongodb.collection('trips');}
});

Trip.all = function(cb){
  Trip.collection.find().toArray(cb);
};

module.exports = Trip;

