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
  "Default": {
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
}

```

You can add more environment variables as properties; so your file could end up looking like this:


```js
{
  "Default": {
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
  },
  "Local": {
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
  "fileName": "local.endpoint.js"
  }
}

```



## Example

**gulpfile.js**

>Plugin creates a js file which is containing all endpoints in your restfull API

You can pass a parameter to the swagger function (in this case: 'Local') to create the endpoints for a specific environment. If left blank or '', default environment will be used

```js
gulp.task('endPoint', function() {
    return gulp.src("./node_modules/gulp-swagger-endpoint/index.js")
          .pipe(swagger('Default'))
          .pipe(gulp.dest('./Scripts/Common/angularjs/config'));
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

