/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Trip    = require('../../app/models/trip'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'road-trip-test',
    obj = {
      name:['My roadtrip'],
      cash:['500'],
      origin:['nashville','36','-82'],
      destination:['new york','25','22'],
      startDate:['2014-08-07'],
      endDate:['2014-08-22'],
      mpg:['22'],
      gasCost:['4'],
      distance:['1000']
    },
    t;
describe('Trip', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      console.log(stdout, stderr);
      t = new Trip(obj);
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Trip object', function(){
      expect(t).to.be.instanceof(Trip);
      expect(t.name).to.equal('My roadtrip');
      expect(t.cash).to.equal(500);
      //expect(t.origin).to.equal({name:'nashville', lat:36, lng:-82});
      expect(t.origin.name).equal('nashville');
      expect(t.origin.lat).equal(36);
      expect(t.origin.lng).equal(-82);
      //expect(t.destination).to.equal({name:'new york', lat:25, lng:22});
      expect(t.destination.name).equal('new york');
      expect(t.destination.lat).equal(25);
      expect(t.destination.lng).equal(22);

      expect(t.startDate).to.respondTo('getDay');
      expect(t.endDate).to.respondTo('getDay');
      expect(t.mpg).to.equal(22);
      expect(t.gasCost).to.equal(4);
      expect(t.distance).to.equal(1000);

      expect(t.photo).to.equal(0);
    });
  });

  describe('.all', function(){
    it('should get all trips', function(done){
      Trip.all(function(err, trips){
        expect(trips).to.have.length(3);
        done();
      });
    });
  });
  describe('.findById', function(){
    it('should find by Id', function(done){
      Trip.findById('000000000000000000000001', function(trip){
        expect(trip.name).to.equal('My Road trip');
        console.log(trip);
        done();
      });
    });
  });
  describe('.create', function(){
    it('should create and save a trip', function(done){
      Trip.create(obj, {carPhoto:[{path:''}]}, function(){
        Trip.collection.findOne({name:'My roadtrip'}, function(err, trip){
          console.log(trip);
          expect(trip._id).to.exist;
          done();
        });
      });
    });
  });
});

