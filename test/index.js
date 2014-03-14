
var assert = require('assert');
var fs = require('fs');
var emb = require('..');

var correct = __dirname + '/fixtures/in.html';
var htmlNotFound = __dirname + '/fixtures/baaaa.html';
var scriptNotFound = __dirname + '/fixtures/notFound.html';
var expected = fs.readFileSync(__dirname + '/fixtures/expected.html', { encoding: 'utf8' });

describe('emb-script', function() {
  it('should embed script', function(done) {
    emb(correct, function(err, out) {
      assert.equal(out, expected);
      done();
    });
  });

  it('should return error if target html does not exist', function(done) {
    emb(htmlNotFound, function(err, out) {
      assert(err instanceof Error);
      done();
    });
  });

  it('should return error if external script does not exist', function(done) {
    emb(scriptNotFound, function(err, out) {
      assert(err instanceof Error);
      done();
    });
  });
});
