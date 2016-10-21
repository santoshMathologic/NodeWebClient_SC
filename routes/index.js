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



router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});


// Routes for UserPlan 
router.get("/api/v1/userPlans", userPlan.getUserPlan);


// Routes for upload
router.post("/api/v1/upload/NewUpload",upload.single('Uploadfile'),userUpload.createNewUpload);


module.exports = router;