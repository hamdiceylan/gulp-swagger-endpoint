var es = require('event-stream');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var header = require('gulp-header');
var footer = require('gulp-footer');
var jsesc = require('jsesc');
var request = require("request-promise");

try {
  var config = require("../../gulp.swagger.conf.json");
} catch (err){
  console.log("Please copy the gulp.swagger.conf (located in node_modules/gulp-swagger-endpoint/) file into your root directory (where your package.json is) .. for more information, visit the GitHub page: https://github.com/hamdiceylan/gulp-swagger-endpoint");
  var config = require("./gulp.swagger.conf.json");
}

/**
* Plugin constants
*/

var count = 0;
var endPointList = "";

if(config.useCommonJs){
  var FILE_HEADER = 'module.exports  =  { \n API_URLS: { \n'
  var FILE_FOOTER = '}};'
}
else{
  var FILE_HEADER = 'API_URLS = { \n';
  var FILE_FOOTER = '};';  
}

function endPointFiles() {
  /**
  * Check file status
  */
  return function endPointFile(file, callback) {
    if (file.processedByEndpointCache) {
      return callback(null, file);
    }

  /**
  * Call Swagger API and parse result
  */
  function getEndpoints(endpoints, count) {
    if(count < endpoints.length) {
      request(endpoints[count].swaggerUrl)
        .then(function(body) {

          var obj = JSON.parse(body);
          var paths =obj.paths;

          endPointList += '/*  Endpoints from '+ config.endpoints[count].swaggerUrl +  ' */ \n';

          if(config.useCommonJs){
            for (var pathKey in paths){
              var singleEndPoint = pathKey;
                for (var methodKey in obj.paths[pathKey]){
                  endPointList += methodKey.toUpperCase() +"_"+ obj.paths[pathKey][methodKey]["operationId"] + ": "
                  if (config.endpoints[count].prefix.change) {
                    singleEndPoint = singleEndPoint.replace(config.endpoints[count].prefix.oldPrefix,config.endpoints[count].prefix.newPrefix);
                  }
                  endPointList += "'" + config.endpoints[count].domain + singleEndPoint +  "',\n";  
                }
            }
          } else {
              for (var pathKey in paths){
                var singleEndPoint = pathKey;
                for (var methodKey in obj.paths[pathKey]){
                  endPointList += '"' +methodKey.toUpperCase() +"_"+ obj.paths[pathKey][methodKey]["operationId"] + '": '
                  if (config.endpoints[count].prefix.change) {
                    singleEndPoint = singleEndPoint.replace(config.endpoints[count].prefix.oldPrefix,config.endpoints[count].prefix.newPrefix);
                  }
                  endPointList += '"' + config.endpoints[count].domain + singleEndPoint + '",\n';  
                }
              }
          }

          getEndpoints(config.endpoints, count+1);

        });

    } else {
        file.contents = new Buffer(gutil.template(endPointList, {
          contents: jsesc(file.contents.toString('utf8')),
          file: file
        }));
        file.processedByEndpointCache = true;
        callback(null, file);  
    }
  }
  getEndpoints(config.endpoints, 0)

  };

}


function endPointStream() {
  return es.map(endPointFiles());
}

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
