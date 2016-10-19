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
         
        var ExactSize = sizeCal.convertBytesToKb(req.file.size, true);
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
                    console.log(data);
                     var uploadObject = new uploadModel({
                    data: buffer,
                    //dataType: dataType,
                    //fileType: fileType,
                    originalFileName: originalFileName,
                    uploadedBy: "santosh",
                    isProcessed: false,
                    status: description,
                    description: description,

                })

                //  uploadPro = new UploadStuff(data,dataType);

                uploadModel.create(uploadObject, function (err) {
                    if (err) return err;
                    res.status(201);
                    return res.json({
                        "status": 200,
                        "success": true,
                        "message": "Upload saved Successfully",
                    });
                });



                    fs.open(path, 'w', function (err, fd) {
                        if (err) {
                            throw 'error opening file: ' + err;
                        }

                        fs.write(fd, buffer, 0, buffer.length, null, function (err) {
                            if (err) throw "error in writing file: " + err;
                            else {

                                fs.unlink("./uploads/" + name, function (err) {
                                    if (err) throw new Error("Unable to Removed File : " + err)
                                    else {
                                        console.log("Junk file deleted SuccessFully " + "./uploads/" + name);


                                    }
                                });

                            }

                        });
                    });






                }

            })
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