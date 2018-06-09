"use strict";

/**
 * Module dependencies.
 */
var http = require('http')
  , path = require('path')
  , express = require('express')
  , indexRouter = require('./routes/index')
  , testRouter = require('./routes/test')
  , aboutRouter = require('./routes/about')
  
  , app = express()
;

var options = {
  host: 'localhost',
  port: 3000
};

//check if server is already running
http.get(options, function(res) {
  console.log('server is running, redirecting to localhost');
  if (window.location.href.indexOf('localhost') < 0) { 
    window.location = 'http://localhost:' + app.get('port');
  }
}).on('error', function(e) {
  //server is not yet running

  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', process.cwd() + '/views');
  app.set('view engine', 'jade');
  app.use(require('stylus').middleware(path.join(process.cwd(), 'public')));
  app.use(express.static(path.join(process.cwd(), 'public')));


  app.use('/', indexRouter);
  app.use('/test', testRouter);
  app.use('/about', aboutRouter);
 

  http.createServer(app).listen(app.get('port'), function(err){
    console.log('server created');
    if (window.location.href.indexOf('localhost') < 0) { 
      window.location = 'http://localhost:' + app.get('port');
    }
  });
});
