var safeRequire = require("../util/saferequire");

module.exports = function(config){
	return function(req,res,next){
		var kicker = {}

		kicker.filter = function(req,data){
			var filters =  config.filters || [];
			filters.forEach(function(filter_name){
				filter = safeRequire("filters/"+filter_name);       
				if(filter){
					data = filter(req,data);
				}
			});
			return data;
		}

		kicker.config = config;
		req.kicker = kicker;
		next();
	}
}