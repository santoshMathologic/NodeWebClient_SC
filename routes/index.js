var express = require('express');
var router = express.Router();
var multer = require('multer');
var userUpload = require('./Upload.js');

var upload = multer({
  dest: './uploads',
 /* limits: {
         fileSize: 5 * 1000000
    }
    */
});


var userPlan = require('./userPlan.js');


/* GET HOME PAGE. */

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Welcome to NodeWebClient Swig and Consolidate Version' },function(err, html){
        res.send('<h3>Server Listining on Url http://localhost:3000</h3>'
        );
    });
});

// Routes for UserPlan 
router.get("/api/v1/userPlans", userPlan.getUserPlan);


// Routes for upload
router.post("/api/v1/upload/NewUpload",upload.single('Uploadfile'),userUpload.NewUpload);


module.exports = router;