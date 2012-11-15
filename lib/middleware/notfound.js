module.exports = function(req, res){
	res.send(404, req.url + ' not found');
}