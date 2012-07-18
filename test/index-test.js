var vows = require('vows');
var assert = require('assert');
var ltxb = require('index');


vows.describe('ltxb').addBatch({
  
  'module': {
    'should export module function': function () {
      assert.isFunction(ltxb);
    },
    'should export compile and render function': function () {
      assert.isFunction(ltxb.compile);
      assert.isFunction(ltxb.render);
    },
    'should support express': function () {
      assert.isFunction(ltxb.__express);
      assert.strictEqual(ltxb.__express, ltxb);
    },
  },
  
  'render file': {
    topic: function() {
      var self = this;
      var options = { name: 'world' };
      ltxb(__dirname + '/fixtures/hello.ltxb', options, function(err, res) {
        self.callback(err, res);
      });
    },
    
    'should not error' : function(err, res) {
      assert.isNull(err);
    },
    'should render correctly' : function(err, res) {
      assert.equal(res, '<greetings><hello name="world"/></greetings>');
    },
  },
  
  'render file with document option': {
    topic: function() {
      var self = this;
      var options = { document: 'doc' };
      ltxb(__dirname + '/fixtures/doc.ltxb', options, function(err, res) {
        self.callback(err, res);
      });
    },
    
    'should not error' : function(err, res) {
      assert.isNull(err);
    },
    'should render correctly' : function(err, res) {
      assert.equal(res, '<foo><bar/></foo>');
    },
  },
  
}).export(module);
