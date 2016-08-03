### Swagger Endpoints

## Install

Install with [npm](https://npmjs.org/package/gulp-swagger-endpoint)

```
npm install gulp-swagger-endpoint --save-dev
```


## Configuration File.

> Set plugin configuration

endpoints: This takes an array of objects, multiple domain and endpoint combinations can be added

useCommonJs: If using common js to build your app, set this to true. If false, a JS object will be created with your endpoints as Key/Value pairs

fileName: Your filename

prefix: If you wish to change the prefix of your URL, assign prefix.change to true. e.g. /api/product will change to /_api/product

> gulp.swagger.conf.json file

This is the default configuration file located in the package root, please copy this file into your app root (where your package.json file is), and edit your configuartions there. This is to avoid your beautiful config file being overwritten on an npm update command.

```js
{
  "endpoints": [{
    "domain": "http://petstore.swagger.io",
    "swaggerUrl": "http://petstore.swagger.io/v2/swagger.json",
    "prefix": { 
      "change": false,
      "oldPrefix" : "api",
      "newPrefix" : "_api"
    }
  }],
  "useCommonJs": true,
  "fileName": "endpoint.js"
}

```



## Example

**gulpfile.js**

>Plugin creates a js file which is containing all endpoints in your restfull API

```js
gulp.task('endPoint', function () {
     gulp.src("./node_modules/gulp-swagger-endpoint/index.js")
         .pipe(swagger())
         .pipe(gulp.dest('./js/config'));
});
```


**endpoints.js**


>Sample output file w/ commonJS = true

```js
module.exports = {
     API_URLS: {
      /*  Endpoints from http://petstore.swagger.io/v2/swagger.json */ 
         Get_Product: "http://petstore.swagger.io/api/product",
         Get_ProductById: "http://petstore.swagger.io/api/product/{Id}",
         Get_ProductByCategoryId: "http://petstore.swagger.io/api/product/{CategoryId}",
         Post_Product: "http://petstore.swagger.io/api/product"
     }
};
```

>Sample output file w/ commonJS = false

```js
 API_URLS = {
    /*  Endpoints from http://petstore.swagger.io/v2/swagger.json */ 
     "Get_Product": "http://petstore.swagger.io/api/product",
     "Get_ProductById": "http://petstore.swagger.io/api/product/{Id}",
     "Get_ProductByCategoryId": "http://petstore.swagger.io/api/product/{CategoryId}",
     "Post_Product": "http://petstore.swagger.io/api/product"
 };
```

