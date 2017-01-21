var express = require('express');
var router = express.Router();
var formidable=require('formidable');
var fs=require('fs-extra');
var path=require('path');
var util=require('util');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/fusion', function(req, res, next) {
    res.render('fusion');
});

router.get('/modification', function(req, res, next) {
    res.render('modification');
});

router.get('/extraction', function(req, res, next) {
    res.render('extraction');
});


router.post('/fusion/upload', function(req, res){
    // create an incoming form object
    console.log(req.files);
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads');
    form.on('file', function (field, file) {
            fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {

        res.redirect('/fusion');
    });

    // parse the incoming request containing the form data
    form.parse(req);

});









module.exports = router;
