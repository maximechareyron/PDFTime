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
    var fichiers=[];
    var i=0;
    var filename;
    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads');
    form.on('file', function (field, file) {
        filename=file.path;
        fichiers[i]=filename;
        i++;
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function(err) {

            var splitter;
        filename.charAt(0) == '/' ? splitter = '/' : splitter = '\\';
        var out = filename.split(splitter).pop() + '.pdf';
        async.series([
                function (callback) {
                    pdftk.fusion(fichiers, out);
                    callback()
                }],
            function () {
                res.sendFile(out, {root: path.join(__dirname, '/..')}, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        exec('rm ' + out);
                    }
                });
            });
        
    });
    // parse the incoming request containing the form data
    form.parse(req);
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
        var splitter;
        filename.charAt(0)=='/' ? splitter = '/' : splitter = '\\';
        var out = filename.split(splitter).pop() + '.pdf';

        pdftk.extraction(fields['numsPages'], filename, out);
        res.sendFile(out, {root: path.join(__dirname, '/..')},function (err){
            exec('rm ' + out);
        });
    });
    form.parse(req);
});

router.post('/uploadform2', function(req, res){
    // create an incoming form object
    var filename;
    var form = new formidable.IncomingForm();
    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '../');
    form.on('file', function (field, file) {
        filename=Date.now()+".pdf";
        fs.rename(file.path, path.join(form.uploadDir, filename));
        console.log(filename);
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    form.on('end', function(err) {
        var fields=Date.now()+".txt";
        pdftk.get_form_fields(fields,filename);
        var tab=generate_form.generate_form(fields,filename);
        exec("rm "+fields);
        res.render('formulaire2', {tab: tab});

    });

    // parse the incoming request containing the form data
    form.parse(req);


});

router.post('/uploadform2/formRempli', function(req,res){
    //req.body affectée dans une autre variable pour pouvoir accéder aux champs facilement sans avoir la valeur du "name"
    var post=req.body;
    var cle2;
    var infile;
    var contenu= "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+ "<xfdf xmlns=\"http://ns.adobe.com/xfdf/\" xml:space=\"preserve\">"+ " <fields>";
    for (var cle in post){
        if (post[cle] == "on" && cle.substring(cle.length-3,cle.length)=="chk") { //Si l'utilisateur veut taper "on" dans un autre champ
            //La valeur d'une chackbox cochée est "on" dans le req.body, et il faut mettre "Yes" dans le fdf, mais il faut que l'utilisateur puisse taper "on"
            // dans un autre champ sans que la valeur soit remplacée par "Yes"
            post[cle] = "Yes";
            cle2=cle.substring(0,cle.length-3);
        }
        else {
            cle2=cle;
        }
        if (cle == "nomOut") { //Nom du fichier pdf uploadé par l'utilisateur
            infile=post[cle];
        }
        else {
            contenu += "\<field name=" + "\"" + cle2 + "\"" + "\><value>" + post[cle] + "\</value>\</field>";
        }
    }
    contenu +="\</fields></xfdf>";

    //Ecrire le fichier sur le serveur
    var fdf= Date.now()+".fdf";
    fs.writeFileSync(path.join(path.join(__dirname,"/.."),fdf),contenu);
    var out= Date.now()+".pdf";
    pdftk.remplirPdf(out,fdf,infile);

    res.sendFile(out, {root: path.join(__dirname, '/..')},function (err){
        exec('rm '+infile);
        exec('rm '+out);
    });
});





module.exports = router;