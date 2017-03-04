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
var qs=require('querystring');
var bodyParser=require('body-parser');
var multer = require('multer');


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

/*
router.post('/extraction/upload', multer({ dest: './routes/uploads/'}).single('upl'), function(req,res){
    console.log(req.body); //form fields
    console.log(req.file); //form files
    res.status(204).end();
});
*/

/* router.post('/extraction/upload', function(req, res){
    /*
    var filename;

    var body ='';
    req.on('data', function(data){
        body += data;
    });
    req.on('end', function(){
        var post = qs.parse(body);
        console.log(post[numsPages]);
    });

    /*
     var form = new formidable.IncomingForm();
     // store all uploads in the /uploads directory
     form.uploadDir = path.join(__dirname, '/uploads');
     form.on('file', function (field, file) {
     console.log("la");
     filename="formextract.pdf";
     fs.rename(file.path, path.join(form.uploadDir, filename));
     });

     form.on('error', function(err) {
     console.log('An error has occured: \n' + err);
     });

     form.on("end", function (err) {
     //Pour l'instant seulement en utilisant le nombre de pages donné dans l'input
     var post=req.body;
     pdftk.extraction(filename,post["numsPage"]);
     res.sendFile("result.pdf", {root: path.join(__dirname, '/..')},function (err){
     exec('rm result.pdf');
     });
     });

     form.parse(req);
});
*/

router.post('/extraction/upload', function(req, res){
    var fields = [];
    var form = new formidable.IncomingForm();

    form.uploadDir = path.join(__dirname, '/uploads');

    form.on('field', function(field, value){
        console.log(field);
        console.log(value);
       fields[field]=value;
    });

    form.on('file', function(name, file){
        var filename="extract.pdf";
        fs.rename(file.path, path.join(form.uploadDir, filename));
    });

    form.on('end', function(){
        pdftk.extraction(fields['numsPages']);
        res.sendFile("result.pdf", {root: path.join(__dirname, '/..')},function (err){
            exec('rm result.pdf');
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