var fs = require("fs");
var path = require("path");

var list = fs.readdirSync(__dirname).filter(function(name){
	return path.extname(name) == ".js" && path.basename(name) !== path.basename(__filename) 
}).map(function(name){
	return path.basename(name,".js");
});


list.forEach(function(name){
	module.exports[name] = require("./" + name);
});
