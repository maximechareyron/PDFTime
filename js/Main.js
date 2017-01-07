/**
 * Created by jeromem on 06/12/16.
 */
include("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");
include("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js");

+ function($) {
    'use strict';

    // UPLOAD CLASS DEFINITION
    // ======================

    var dropZone = document.getElementById('drop-zone');

    var startUpload = function(files) {
        console.log(files)
    }

    dropZone.ondrop = function(e) {
        e.preventDefault();
        this.className = 'upload-drop-zone';

        startUpload(e.dataTransfer.files)
    }

    dropZone.ondragover = function() {
        this.className = 'upload-drop-zone drop';
        return false;
    }

    dropZone.ondragleave = function() {
        this.className = 'upload-drop-zone';
        return false;
    }

}(jQuery)




//Fonction pour la page extraction


function visibility(thingId)
{
        var targetElement;
        targetElement = document.getElementById(thingId) ;
        if (targetElement.style.display == "none" )
        {
            targetElement.style.display = "" ;
            if(thingId=='my_help') {
                document.getElementById('btnHelp').className = "btn btn-info";
            }
        }
        else {
            targetElement.style.display = "none" ;

            if(thingId=='my_help') {
                document.getElementById('btnHelp').className = "btn btn-default";
            }
        }
}


//Fonction pour la pages de fusion


var NBFILE = 0;
var listPathFile = new Array();

function addNewFile() {

    var MaDiv = document.createElement('div');
    MaDiv.className='text-left';
    MaDiv.id=('add');
    MaDiv.innerHTML='Selectionner un PDF à fusionner\
                        <form>\
                        <div class="input-group" style="margin-bottom:2.5%;">\
                            <input type="text" class="form-control" placeholder="Chemin vers fichier" >\
                            <div class="input-group-btn">\
                            <button class="btn btn-default" type="file">\
                            Parcourir\
                            </button>\
                            </div>\
                            </div>\
                            </form>';
    document.getElementById('zone_nbFile').appendChild(MaDiv);
    NBFILE=NBFILE+1;
}

function rmFile(){
    var element = document.getElementById('add')// element à supprimer
    element.parentNode.removeChild(element);
    NBFILE=NBFILE-1;
}

function alertSave(){
    var alertdiv=document.createElement('div');
    alertdiv.className='alert alert-success alert-dismissible col-sm-8 col-sm-offset-2 ';
    alertdiv.style.top="1%";
    alertdiv.innerHTML='\
    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\
        <strong>File successfully save !</strong> \
        <button class="btn btn-md btn-success" style="margin-left:25px;">Open file</button>\
        <button class="btn btn-md btn-success" style="margin-left:25px;">Open directory</button>';
    document.body.appendChild(alertdiv);

}

function Validation_Fusion()
{
    var commandPDFtk = new String('pdftk ');

    commandPDFtk = commandPDFtk + listPathFile(NBFILE-1); //get PATH
    commandPDFtk = commandPDFtk + ' ' + 'output' + ' ' + document.getElementsByName('outputPATH').toString(); // ajouter le PATH du fichier de sorti

    NBFILE--;
    listPathFile = new Array();
    alertSave(); ///realisation en cours
}