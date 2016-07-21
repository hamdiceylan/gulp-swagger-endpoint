var expect    = require("chai").expect;
var gutil = require('gulp-util');
var mainModule = require("../index.js");
var config = require("../config.json");

describe("Endpoint exporter from swagger", function() {

   it('should build valid js file from swagger api with commonjs', function (cb) {
    var stream = mainModule();
    config.useCommonJs = false;
    stream.on('data', function (file) {
      
      expect(file.contents.toString('utf8')).to.contain('API_URLS');
      //expect(file.contents.toString('utf8')).to.not.contain('module.exports');
      cb();
    });

    stream.write(new gutil.File({
      base: __dirname,
      path: __dirname + '/endpoint.js',
      contents: new Buffer('')
    }));

    stream.end();
  });

  it('should build valid js file from swagger api without commonjs', function (cb) {
    var stream = mainModule();

    stream.on('data', function (file) {

      expect(file.contents.toString('utf8')).to.contain('API_URLS');
      expect(file.contents.toString('utf8')).to.contain('module.exports');

      cb();
    });

    stream.write(new gutil.File({
      base: __dirname,
      path: __dirname + '/endpoint.js',
      contents: new Buffer('')
    }));

    stream.end();
  });

});