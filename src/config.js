"use strict";

exports.defaults = function() {
  return {
    hogan: {
      extensions: [ "hog", "hogan", "hjs" ]
    }
  };
};

exports.placeholder = function() {
  return "\t\n\n" +
         "  hogan:               # config settings for the Hogan compiler module\n" +
         "    lib: undefined    # use this property to provide a specific version of Hogan\n" +
         "    extensions: [\"hog\", \"hogan\", \"hjs\"]  # default extensions for Hogan files\n";
};

exports.validate = function( config, validators ) {
  var errors = [];

  if ( validators.ifExistsIsObject( errors, "hogan config", config.hogan ) ) {

    if ( !config.hogan.lib ) {
      config.hogan.lib = require( "hogan.js" );
    }

    if ( validators.isArrayOfStringsMustExist( errors, "hogan.extensions", config.hogan.extensions ) ) {
      if (config.hogan.extensions.length === 0) {
        errors.push( "hogan.extensions cannot be an empty array");
      }
    }
  }

  return errors;
};
