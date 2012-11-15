var path = require("path");

module.exports = function(req,data){
	if(path.extname(req.url) == ".js"){
		return '"use strict";\n'+data;
	}else{
		return data;
	}
}

