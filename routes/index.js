var express = require('express');
var router = express.Router();
var formidable=require('formidable');
var fs=require('fs-extra');
var path=require('path');
var util=require('util');
var pdftk=require('../modules/pdftk');
var generate_form=require('../modules/generate_form');
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
    upload(req,res,function (fichiers){pdftk.fusion(fichiers);});
});

router.post('/extraction/upload', function(req, res){
    var fields = [];
    var form = new formidable.IncomingForm();
    var filename;

    form.uploadDir = path.join(__dirname, '/uploads');

    form.on('field', function(field, value){
        fields[field]=value;
    });

    form.on('file', function(name, file){
        filename = file.path;
    });

    form.on('end', function(){
        var out = filename.split('/').pop();
        pdftk.extraction(fields['numsPages'], filename, out);
        res.sendFile(out, {root: path.join(__dirname, '/..')},function (err){
            exec('rm' + out);
        });
    });
    form.parse(req);
});

router.post('/uploadform2', function(req, res){
    // create an incoming form object
    var form = new formidable.IncomingForm();
    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads');
    form.on('file', function (field, file) {
        var filename="formfic.pdf";
        fs.rename(file.path, path.join(form.uploadDir, filename));
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    form.on('end', function(err) {
        pdftk.get_form_fields();
        var tab=generate_form.generate_form();
        res.render('formulaire2', {tab: tab});

    });

    // parse the incoming request containing the form data
    form.parse(req);


});

router.post('/uploadform2/formRempli', function(req,res){
    var post=req.body;
    console.log(req.body);
    var contenu= "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+ "<xfdf xmlns=\"http://ns.adobe.com/xfdf/\" xml:space=\"preserve\">"+ " <fields>";
    for (var cle in post){
        if (post[cle] == "on") {
            post[cle] = "Yes";
        }
        contenu+="\<field name="+"\""+cle+"\""+"\><value>"+post[cle]+"\</value>\</field>";
    }
    contenu +="\</fields></xfdf>";
    fs.writeFileSync(path.join(path.join(__dirname,"/.."),"formrempli.fdf"),contenu);
    pdftk.remplirPdf();
    res.sendFile("result.pdf", {root: path.join(__dirname, '/..')},function (err){
        exec('rm result.pdf');
    });
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
        var filename=i+".pdf";
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