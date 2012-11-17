var request = require("request");

function withAjaxHeader(req){
    return req.get("X-Requested-With") == "XMLHttpRequest";
}

function withJSONPParam(req){
    return !!req.query.callback;
}


module.exports = function(config){
    return function (req, res, next) {
        var fallback = config.ajax_fallback,
            isAjax = withAjaxHeader(req),
            isJSONP = withJSONPParam(req);

        if (fallback && ( isAjax || isJSONP)) {
            req.pipe(request("http://"+fallback+req.url)).pipe(res);
        }else{
            next();
        }
    }
}
