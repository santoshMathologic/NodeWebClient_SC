var express = require('express');
var router = express.Router();
var fs = require('fs');
var q = require('q');
var multer = require('multer')
var Promise = require("bluebird");
var upload = multer({ dest: 'uploads/' })
var sizeCal = require('../Utils/convertFileSystem.js');


var isDebug = false;
var DEBUG = function (val) {
    if (isDebug) {
        console.log("SpringDataRestApi : LOG : ");
        console.log(val);
    }
};
var ERROR = function (val) {
    console.log("SpringDataRestApi : ERROR : ");
    console.log(val);
};

var LOG = function (val) {
    console.log("SpringDataRestApi : LOG : ");
    console.log(val);
};

var UploadObject = {

    NewUpload: function (req, res) {
        var path = req.file.path;
        var name = req.file.filename;
        var originalFileName = req.file.originalname;
        var sizeOfFile = req.file.size;
        var ExactSize =  sizeCal.convertBytesToKb(sizeOfFile);


    }


}

module.exports = UploadObject;