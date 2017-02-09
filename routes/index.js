var express = require('express');
var router = express.Router();
var formidable=require('formidable');
var fs=require('fs-extra');
var path=require('path');
var util=require('util');
var pdftk=require('../modules/pdftk');
var async=require('async');
var exec = require('child_process').exec;

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

router.get('/formulaire', function(req, res, next) {
    res.render('formulaire');
});



router.post('/fusion/upload', function(req, res){
    upload(req,res,function (fichiers){pdftk.fusion(fichiers);} );
});

router.post('/extraction/upload', function(req, res){

    upload(req,res,function (fichiers,nums){pdftk.extraction(fichiers,nums);} );


});

router.post('/formulaire/upload', function(req, res){

    // create an incoming form object
    var form = new formidable.IncomingForm();

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads');
    form.on('file', function (field, file) {
        filename="formfic.pdf";
        fs.rename(file.path, path.join(form.uploadDir, filename));
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // parse the incoming request containing the form data
    form.parse(req);

    //upload(req,res,function (fic){pdftk.get_form_fields(fic);} );

    res.render("formulaire");
});

function upload(req,res,fonctionPdftk){
    var fichiers=[];
    var i=0;
    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads');
    form.on('file', function (field, file) {
        filename=i+".pdf";
        fichiers[i]=filename;
        fs.rename(file.path, path.join(form.uploadDir, filename));
        i++;
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function(err) {
        async.series([
                function (callback){ fonctionPdftk(fichiers,req.body.numsPages) ;   callback()}],
            function(){res.sendFile("result.pdf", {root: path.join(__dirname, '/..')},function (err){
                if (err){
                    console.log(err);
                }
                else {
                    exec('rm result.pdf');
                }
            });});

    });


    // parse the incoming request containing the form data
    form.parse(req);

}



module.exports = router;