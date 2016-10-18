var express = require('express');
var router = express.Router();


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


module.exports = router;