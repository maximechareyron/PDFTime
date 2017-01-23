/**
 * Created by jeromem on 06/12/16.
 */
function include(fileName){
    document.write("<script type='text/javascript' src='javascripts/"+fileName+"'></script>" );
}

//include("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");
//include("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js");
include("dragndrop.js");
include("filepath.js");
include("pdf.js");
include("pdf.worker.js");
include("bootstrap.js");

+ function($) {
    'use strict';

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



function addNewFile() {

    NBFILE=NBFILE+1;
    var MaDiv = document.createElement('div');
    MaDiv.className='text-left';
    MaDiv.id=('zoneMobile'+NBFILE);
    MaDiv.innerHTML='<div class="contenant" id="contenant'+NBFILE+'">\
    <p style="margin : 0 0 0 20px;">Selectionner un PDF à fusionner</p>\
        <i class="glyphicon glyphicon-trash trashbtn" id="trash'+NBFILE+'" onclick="trashFILE('+NBFILE+')"></i>\
                        <i class="glyphicon glyphicon-move movebtn" id="tiretMove'+NBFILE+'" draggable="true"></i> \
        <div class="input-group" style="margin-bottom:2px;">\
        <input type="text" class="form-control" placeholder="Chemin vers fichier" id="inputPath'+NBFILE+'" disabled style="cursor: text">\
        <div class="input-group-btn">\
        <input id="fileInput'+NBFILE+'" class="fileInput" accept="application/pdf" type="file" name="upload"  style="display:none;" />\
        <input type="button" class="btn btn-default"  value="Parcourir" onclick="searchinput('+NBFILE+');"/>\
        </div>\
        </div>\
        </div>\
        <div class="newplace" id="newplace'+NBFILE+'"/>';
    document.getElementById('zone_nbFile').appendChild(MaDiv);
    document.getElementById('validButton').disabled= true;
}

function createNewFile() {

    NBFILE=NBFILE+1;
    var MaDiv = document.createElement('div');
    MaDiv.className='text-left';
    MaDiv.id=('zoneMobile'+NBFILE);
    MaDiv.innerHTML='<div class="contenant" id="contenant'+NBFILE+'">\
    <p style="margin : 0 0 0 20px;">Selectionner un PDF à fusionner</p>\
                        <i class="glyphicon glyphicon-trash trashbtn" id="trash'+NBFILE+'" onclick="trashFILE('+NBFILE+')"></i>\
                        <i class="glyphicon glyphicon-move movebtn" id="tiretMove'+NBFILE+'" draggable="true"></i> \
        <div class="input-group" style="margin-bottom:2px;">\
        <input type="text" class="form-control" placeholder="Chemin vers fichier" id="inputPath'+NBFILE+'" disabled style="cursor: text">\
        <div class="input-group-btn">\
        <input id="fileInput'+NBFILE+'" class="fileInput" accept="application/pdf" type="file" name="upload"  style="display:none;" />\
        <input type="button" class="btn btn-default"  value="Parcourir" onclick="searchinput('+NBFILE+');"/>\
        </div>\
        </div>\
        </div>\
        <div class="newplace" id="newplace'+NBFILE+'"/>';
    return MaDiv;

}

function trashFILE(FileNum){
    var element = document.getElementById('zoneMobile'+FileNum)// element à supprimer
    element.parentNode.removeChild(element);
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
    window.setTimeout(function(){
        document.body.removeChild(alertdiv);
    }, 5000);


}