var _ = require("underscore");
var fs = require("fs");
var path = require("path");

function requireIfExists(pos){
	if(fs.existsSync(pos) || fs.existsSync(pos+".js" || fs.existsSync(pos+".json"))){
		return require(pos);
	}else{
		return;
	}

}

module.exports = function (pos,merge){

	var defaultPos = path.join(__dirname, "..",pos)
	,appPos = path.join(process.cwd(),".kicker",pos);

	moduleUnderBase = requireIfExists(defaultPos);
	moduleUnderApp = requireIfExists(appPos);

	return merge ? _.extend(moduleUnderBase,moduleUnderApp) : (moduleUnderApp||moduleUnderBase);
}