module.exports = function(req,res){
	res.send(200,req.kicker.config);
}