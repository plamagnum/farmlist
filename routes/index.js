var express = require('express');
var router = express.Router();

/*GET home page.*/ 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FarmList' });
});

router.get('/farmlist', function(req, res){
   var db = req.db;
   var collection = db.get('usercollection');
   collection.find({},{},function(e,docs){
      res.render('farmlist',{
         title: 'Farm list',
         "farmlist" : docs
      });   
   });
});

router.get('/addlink', function(req, res, next){
   res.render('addlink', {title: 'Add Link'});
});

router.post('/addfarm', function(req, res){
   var db = req.db;

   var userLink = req.body.link;
   var xy = req.body.xy;
   var userName = req.body.name;

   var collection = db.get('usercollection');

   collection.insert({
      "link" : userLink,
      "xy" : xy,
      "name" : userName
   }, function (err, doc) {
      if (err) {
         res.send("Problems");
      }
      else {
      res.redirect("farmlist");
      }
   });      
});

router.get('/userdel/:id', function(req, res){
   var db = req.db;
   var collection = db.get('usercollection');
   var userToDelete = req.params.id;
   collection.remove({'_id': userToDelete}, function(err){
      res.send((err === null) ? {msg: ''} : {msg:'error' + err});
   });
   res.redirect('/farmlist');   
});

module.exports = router;
