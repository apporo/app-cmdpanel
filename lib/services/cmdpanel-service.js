'use strict';

var path = require('path');
var Devebot = require('devebot');
var Promise = Devebot.require('bluebird');
var loader = Devebot.require('loader');
var lodash = Devebot.require('lodash');
var debugx = Devebot.require('debug')('appCmdpanel:service');

var Service = function(params) {
  debugx.enabled && debugx(' + constructor begin ...');

  params = params || {};

  var self = this;
  var logger = params.loggingFactory.getLogger();
  var pluginCfg = params.sandboxConfig;
  var contextPath = pluginCfg.contextPath || '/cmdpanel';
  var express = params.webweaverService.express;

  // params.webinjectService.enqueue(menuTemplate[menuType]);

  self.getStaticFilesLayer = function() {
    return {
      name: 'app-cmdpanel-public',
      path: contextPath,
      middleware: express.static(path.join(__dirname, '../../public'))
    };
  }

  var router = new express();
  router.set('views', __dirname + '/../../views');
  router.set('view engine', 'ejs');
  router.route('/assets/cmdpanel/js/loader.js').get(function(req, res, next) {
    res.render('loader_js', {
    });
  });

  self.getJavascriptLayer = function() {
    return {
      name: 'app-cmdpanel-router',
      path: contextPath,
      middleware: router
    };
  }

  if (pluginCfg.autowired !== false) {
    params.webinjectService.inject([
      self.getJavascriptLayer(),
      self.getStaticFilesLayer()
    ], pluginCfg.priority);
  }

  debugx.enabled && debugx(' - constructor end!');
};

Service.referenceList = ["webinjectService", "webweaverService"];

module.exports = Service;
