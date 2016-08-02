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

```js
{
  "endpoints": [{
    "domain": "http://petstore.swagger.io",
    "swaggerUrl": "http://petstore.swagger.io/v2/swagger.json"
  }],
  "useCommonJs": true,
  "fileName": "endpoint.js",
  "prefix": { 
    "change": false,
    "oldPrefix" : "api",
    "newPrefix" : "_api"
  }
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
         Get_Product: "/api/product",
         Get_ProductById: "/api/product/{Id}",
         Get_ProductByCategoryId: "/api/product/{CategoryId}",
         Post_Product: "/api/product"
     }
};
```

>Sample output file w/ commonJS = false

```js
 API_URLS = {
    /*  Endpoints from http://petstore.swagger.io/v2/swagger.json */ 
     "Get_Product": "/api/product",
     "Get_ProductById": "/api/product/{Id}",
     "Get_ProductByCategoryId": "/api/product/{CategoryId}",
     "Post_Product": "/api/product"
 };
```

