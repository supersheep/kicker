#!/usr/bin/env node

/**
 * Module dependencies.
 */

var kicker = require('../lib/kicker.js');
var program = require('commander');


program
  .version('0.0.1')
  .option('-p, --port [port]','set the port to run kicker server',1337)
  .parse(process.argv);


kicker.start(program);