/*jshint expr: true*/
//note(seb): this allows us to do stuff like should.be.true;

'use strict';

var should = require('should'),
  request = require('supertest'),
  mongoose = require('mongoose'),
  path = require('path'),
  config = require(path.resolve('./api/config/config')),
  express = require(path.resolve('./api/config/lib/express'));

/**
 * Globals
 */
var app, agent;

describe('Configuration Tests', function() {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  it('should return something on the base route', function(done) {
    
    agent.get('/')
      .end(function(req, res) {
        (res.body).should.be.ok;
        done();
      });
  });


});