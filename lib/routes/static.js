var express = require("express");
var fs = require("fs");
var path = require("path");
module.exports = function(req,res,next){
	express.static(process.cwd())(req,res,next);
}

