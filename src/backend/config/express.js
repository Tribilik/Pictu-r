let express = require('express');
let glob = require('glob');
let path = require('path');

let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let compress = require('compression');
let methodOverride = require('method-override');
let exphbs  = require('express-handlebars');

module.exports = function(app, config) {
  let env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.engine('handlebars', exphbs({
    layoutsDir: config.root + '/app/views/layouts/',
    defaultLayout: 'main',
    partialsDir: [config.root + '/app/views/partials/']
  }));
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'handlebars');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json({limit:'5mb'}));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(path.join(config.root, '../../dist')));
  app.use(methodOverride());

  let controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

};
