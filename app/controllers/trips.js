'use strict';

var mp = require('multiparty'),
    Trip = require('../models/trip');

exports.index = function(req, res){
  //find all trips
  Trip.all(function(err, trips){
    res.render('trips/index', {trips:trips});
  });
};

exports.new = function(req, res){
  res.render('trips/new');
};

exports.create = function(req, res){
  //parse req with multiparty, console.log fiels and forms.
  // could we just do mp.Form.parse(req... ?
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){
    Trip.create(fields, files, function(){
      res.redirect('/trips');
    });
  });
};
