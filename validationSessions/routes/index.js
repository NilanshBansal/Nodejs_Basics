var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Form Validation',success:req.session.success,errors:req.session.errors });
  req.session.errors=null;
});

/*router.get('/test/:id',function(req,res,next){
  res.render('test',{output:req.params.id});
});

router.post('/test/submit',function(req,res,next){
  var id=req.body.id;
  res.redirect('/test/' + id);
});
*/
router.post('/submit',function(req,res,next){
  req.check('email','invalid email address!!!').isEmail();
  req.check('password','invalid password!!!').isLength({min:4}).equals(req.body.confirmPassword);

  var errors=req.validationErrors();
  if (errors){
    req.session.errors=errors;
    req.session.success=false;
  }
  else{
    req.session.success=true;
  }
  res.redirect('/');
  
});
module.exports = router;
