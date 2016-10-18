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
        console.log("NodeRestApi : LOG : "+val);
        
    }
};
var ERROR = function (val) {
    console.log("NodeRestApi : ERROR : ");
    console.log(val);
};

var LOG = function (val) {
    console.log("NodeRestApi : LOG : ");
    console.log(val);
};

var UploadObject = {

    NewUpload: function (req, res) {
        var path = req.file.path;
        var name = req.file.filename;
        var originalFileName = req.file.originalname;
        var sizeOfFile = req.file.size;
        var ExactSize = sizeCal.convertBytesToKb(sizeOfFile, true);
        var dirName = 'uploadCSV';

        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName);
        }

        try {
            isDebug = true;
            DEBUG("In Debug Mode");
        } catch (exception) {
            console.log("Exception :" + exception);
        }





        console.log("" + ExactSize);
        return res.json({
            messages: "The size of the Fies is",
            fileSize: "" + ExactSize
        })


    }


}

module.exports = UploadObject;