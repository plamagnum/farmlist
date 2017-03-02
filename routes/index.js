var express = require('express');
var router = express.Router();

/*GET home page.*/ 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/userlist', function(req, res){
   var db = req.db;
   var collection = db.get('usercollection');
   collection.find({},{},function(e,docs){
      res.render('userlist',{
         title: 'User list',
         "userlist" : docs
      });   
   });
});

router.get('/addlink', function(req, res, next){
   res.render('addlink', {title: 'Add Link'});
});

router.post('/addfarm', function(req, res){
   var db = req.db;

   var userName = req.body.link;
   var userEmail = req.body.name;

   var collection = db.get('usercollection');

   collection.insert({
      "link" : userName,
      "name" : userEmail
   }, function (err, doc) {
      if (err) {
         res.send("Problems");
      }
      else {
      res.redirect("userlist");
      }
   });      
});

router.get('/:_id', function(req, res){
   var db = req.db;
   var collection = db.get('usercollections');
   var userToDelete = req.params.id;
   collection.remove({'_id': userToDelete}, function(err){
      res.send((err === null) ? {msg: ''} : {msg:'error' + err});
   });
   res.redirect('/userlist');   
});

module.exports = router;
