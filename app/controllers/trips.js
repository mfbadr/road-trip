'use strict';

exports.index = function(req, res){
  res.render('home/index');
};

exports.new = function(req, res){
  res.render('trips/new');
};
