var express = require('express');
var router = express.Router();
var fs = require('fs');
var q = require('q');
var multer = require('multer')
var Promise = require("bluebird");
var upload = multer({ dest: 'uploads/' })
var sizeCal = require('../Utils/convertFileSystem.js');
var custException = require('../library/exception.js');
var uploadModel = require("../models/upload.js");




var UploadObject = {

    NewUpload: function (req, res) {
        var path = req.file.path;
        var name = req.file.filename;
        var originalFileName = req.file.originalname;
        var fileSize = sizeCal.convertBytesToKb(req.file.size, true);
        var dirName = 'uploadCSV';

        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName);
        }

        try {
            isDebug = true;
            custException.DEBUG("In Debug Mode");
            fs.readFile(path, 'utf8', function (error, data) {
                if (error) {
                    throw new Error("Error Reading in File : " + error)
                } else {
                    buffer = new Buffer(data);
                    // console.log(data);
                    var uploadObject = new uploadModel({
                        data: buffer,
                        //dataType: dataType,
                        //fileType: fileType,
                        originalFileName: originalFileName,
                        uploadedBy: "santosh",
                        isProcessed: false,
                        status: "Files Uploaded Successfully",
                        description: "Files Uploaded Successfully"

                    })

                    //  uploadPro = new UploadStuff(data,dataType);



                    fs.writeFile(dirName+"/"+originalFileName, data, function (err) {
                        if (err) {
                            console.log('Some error occured - file either not saved or corrupted file saved.');
                        } else {
                            console.log('It\'s saved!');
                            fs.unlink('./' + path, function (err) {
                                if (err) throw new Error("Error "+err)
                                else {
                                    console.log("file deleted");
                                    /*uploadModel.create(uploadObject, function (err) {
                                        if (err) return err;
                                        res.status(201);
                                        return res.json({
                                            "status": 200,
                                            "success": true,
                                            "message": "Upload saved Successfully",
                                        });
                                    });
                                    */


                                }
                            });
                           
                        }
                    });
                }

            })
        } catch (exception) {
            console.log("Exception :" + exception);
        }






        return res.json({
            messages: "The size of the Fies is",
            fileSize: "" + fileSize
        })


    }


}

module.exports = UploadObject;