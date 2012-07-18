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
  
  'render file with self option': {
    topic: function() {
      var self = this;
      var options = { name: 'world', self: true };
      ltxb(__dirname + '/fixtures/hello-self.ltxb', options, function(err, res) {
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
  
  'render file without locals': {
    topic: function() {
      var self = this;
      ltxb(__dirname + '/fixtures/static.ltxb', function(err, res) {
        self.callback(err, res);
      });
    },
    
    'should not error' : function(err, res) {
      assert.isNull(err);
    },
    'should render correctly' : function(err, res) {
      assert.equal(res, '<beep><boop/></beep>');
    },
  },
  
  'useful stack traces': {
    topic: function() {
      var self = this;
      
      var str = [
        "xml.n('root')",
        "  .c('hello', {'name': name })" // Failing line 
      ].join("\n");
      
      ltxb.render(str, function(err, res) {
        self.callback(err, res);
      });
    },
    
    'should error' : function(err, res) {
      assert.strictEqual(err.name, 'ReferenceError');
      assert.include(err.message, 'name is not defined');
      assert.include(err.message, 'ltxb:');
    },
  },
  
  'non useful stack traces': {
    topic: function() {
      var self = this;
      var options = { compileDebug: false };
      
      var str = [
        "xml.n('root')",
        "  .c('hello', {'name': name })" // Failing line 
      ].join("\n");
      
      ltxb.render(str, options, function(err, res) {
        self.callback(err, res);
      });
    },
    
    'should error' : function(err, res) {
      assert.strictEqual(err.name, 'ReferenceError');
      assert.include(err.message, 'name is not defined');
      assert.equal(err.message.indexOf('ltxb:'), -1);
    },
  },
  
}).export(module);
