"use strict";

var path = require( 'path' )
  , config = require( './config' )
  , getExtensions = function ( mimosaConfig ) {
    return mimosaConfig.hogan.extensions;
  };

var prefix = function ( mimosaConfig, libraryPath ) {
  if ( mimosaConfig.template.wrapType === 'amd' ) {
    return "define(['" + libraryPath + "'], function (Hogan){ var templates = {};\n";
  } else {
    if ( mimosaConfig.template.wrapType === "common" ) {
      return "var Hogan = require('" + mimosaConfig.template.commonLibPath + "');\nvar templates = {};\n";
    }
  }

  return "var templates = {};\n";
};

var suffix = function ( mimosaConfig ) {
  if ( mimosaConfig.template.wrapType === 'amd' ) {
    return "return templates; });";
  } else {
    if ( mimosaConfig.template.wrapType === "common" ) {
      return "\nmodule.exports = templates;";
    }
  }

  return "";
};

var compile = function ( mimosaConfig, file, cb ) {
  var error, output;

  try {
    var compiledOutput = mimosaConfig.hogan.lib.compile( file.inputFileText, { asString:true } );
    output = "templates['" + file.templateName + "'] = new Hogan.Template(" + compiledOutput + ");\n";
  } catch ( err ) {
    error = err;
  }

  cb( error, output );
};

module.exports = {
  name: "hogan",
  compilerType: "template",
  clientLibrary: path.join( __dirname, "client", "hogan-template.js" ),
  compile: compile,
  suffix: suffix,
  prefix: prefix,
  extensions: getExtensions,
  defaults: config.defaults,
  placeholder: config.placeholder,
  validate: config.validate
};