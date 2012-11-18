var path = require("path");
var fs = require("fs");
var http = require("http");
var express = require("express");
var _ = require("underscore");
var middlewares = require("./middleware/middlewares");
var safeRequire = require("./util/saferequire");


var kicker = module.exports = {};



function requireIfExists(pos){
    if(fs.existsSync(pos)){
        return require(pos);
    }else{
        return;
    }
}



kicker.start = function(options){
    var base = process.cwd();

    // mkdir and default configs under .kicker if not exist and log infos
    if(!fs.existsSync(path.join(base,".kicker"))){
        var default_config =  {
            "filters":["strict"],
            "routes":[{
                "url":"*",
                "route":"static"
            }]
        }

        fs.mkdirSync(".kicker");
        fs.mkdirSync(".kicker/routes");
        fs.mkdirSync(".kicker/filters");
        fs.writeFileSync(".kicker/config.json",JSON.stringify(default_config));
        console.log("mkdir .kicker, all custom options can be set here");
    }

    // 获取起始目录中的配置，覆盖默认配置
    var config = safeRequire("config.json",true);

    // 应用基本中间件
    var app = express();

    app.use(express.logger('dev'))
    .use(express.cookieParser())
    .use(middlewares.kicker(config))
    .use(middlewares.fallback(config))
    .use(app.router)
    .use(middlewares.notfound);

    config.routes.forEach(function(route){
        var route_name = route.route;

        var controller = safeRequire("routes/"+route_name);

        app.get(route.url, function(req,res,next){
            if(controller){
                controller(req,res,next);
            }else{
                next();
            }
        });
    });


    http.createServer(app).listen(options.port, function () {
        console.log("kicker serves",base,"at",options.port);
    });
}