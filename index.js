var es = require('event-stream');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var header = require('gulp-header');
var footer = require('gulp-footer');
var jsesc = require('jsesc');
var request = require("request");
var config = require("./config.json")

/**
 * Plugin constants
 */

if(config.useCommonJs){
  var FILE_HEADER = 'module.exports  =  { \n API_URLS: { \n'
  var FILE_FOOTER = '}};'
}
else{
  var FILE_HEADER = 'API_URLS: { \n';
  var FILE_FOOTER = '};';  
}

function endPointFiles() {

  /**
     * Check file status
  */
  return function endPointFile(file, callback) {
    if (file.processedByTemplateCache) {
      return callback(null, file);
    }

    /**
     * Call Swagger API and parse result
     */

    request(config.swaggerUrl, function(error, response, body) {
      
      var obj = JSON.parse(body);
      var paths =obj.paths;
      var endPointList = "";

      for (var pathKey in paths){
          var singleEndPoint = pathKey;
          for (var methodKey in obj.paths[pathKey]){
                endPointList += methodKey.toUpperCase() +"_"+ obj.paths[pathKey][methodKey]["operationId"] + ":"
                if (config.prefix.change) {
                    singleEndPoint = singleEndPoint.replace(config.prefix.oldPrefix,config.prefix.newPrefix);
                }
                endPointList += "'" + singleEndPoint +  "',\n";  
          }
      }

      file.contents = new Buffer(gutil.template(endPointList, {
        contents: jsesc(file.contents.toString('utf8')),
        file: file
      }));

      file.processedByTemplateCache = true;

      callback(null, file);

    });

  };

}


function endPointStream() {

  return es.map(endPointFiles());

}

/**
 * Create file
 *
 
 */

function endPoint() {

  /**
   * Build template
   */
  
  return es.pipeline(
    endPointStream(),
    concat(config.fileName),
    header(FILE_HEADER),
    footer(FILE_FOOTER)
  );

}

/**
 * Expose template
 */

module.exports = endPoint;
