var express = require('express');
var router = express.Router();
let util=require('util');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req);
  res.send(JSON.stringify(util.inspect(req),null,2));
});

router.get('/test',function(req,res,next){
  res.send('testing 123 !!!');
});


module.exports = router;
