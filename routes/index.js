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

router.get('/formulaire2',function(req,res){
    res.render('formulaire2');
} );

router.post('/formulaire/upload', function(req, res){

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

    // parse the incoming request containing the form data
    form.parse(req);

    var tab;
    form.on('end', function(err) {
        var io = require('socket.io')("/bin.www".server);
        pdftk.get_form_fields(path.join(form.uploadDir, "formfic.pdf"));

        async.series([
                function (callback){  res.redirect("/formulaire2");   callback()}],
            function(){tab=generate_form.generate_form();},function(){io.sockets.emit('tab',tab);});

    });
    //
});

router.post('/formRempli', function(req,res){
    var post=qs.parse(req);
    var nbElemen=req.body.nbElem;
    var contenu= "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+ "<xfdf xmlns=\"http://ns.adobe.com/xfdf/\" xml:space=\"preserve\">"+ " <fields>";
    for (var i=0; i<=nbElemen;i++){
        var nom="elem"+i;
        contenu+="\<field name="+nom+"\><value>"+post[nom]+"\</field>";
    }
    contenu +="\</fields></xfdf>";
    fs.writeFileSync("/routes/uploads/formrempli.xfdf",contenu,function (err,data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);});
    pdftk.remplirPdf();
})

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