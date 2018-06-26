var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,success:req.session.success,errors:req.session.errors});
  req.session.errors=null;
});

router.post('/submit',function(req,res,next){
  var obj={};
  obj["email"]=req.body.email;
  obj["password"]=req.body.password;

  req.check('email','invalid email address!').isEmail();
  req.check('password','invalid password!').isLength({min:4});

  var errors=req.validationErrors();
  if(errors){
    req.session.success=false;
    req.session.errors=errors;
    return res.redirect('/');
  }
  req.session.success=true;
  res.render('dashboard',{object:obj});
});


module.exports = router;
