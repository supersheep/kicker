var request = require("request");


/*
function withAjaxHeader(req){
    return req.get("X-Requested-With") == "XMLHttpRequest";
}

function withJSONPParam(req){
    return !!req.query.callback;
}
*/

module.exports = function(config){
    return function (req, res, next) {
        var fallback = config.fallback;

        if (fallback) {
            req.pipe(request("http://"+fallback+req.url)).pipe(res);
        }else{
            next();
        }
    }
}
