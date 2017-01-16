/**
 * Created by jeromem on 06/12/16.
 */
include("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");
include("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js");
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
    MaDiv.innerHTML='<p style="margin : 0 0 0 20px;">Selectionner un PDF à fusionner</p>\
                        <form>\
                        <i class="glyphicon glyphicon-trash trashbtn" id="trash'+NBFILE+'" onclick="trashFILE('+NBFILE+')"></i>\
                        <i class="glyphicon glyphicon-move movebtn" id="tiretMove'+NBFILE+'" ></i> \
        <div class="input-group" style="margin-bottom:2.5%;">\
        <input type="text" class="form-control" placeholder="Chemin vers fichier" id="inputPath'+NBFILE+'" disabled style="cursor: text">\
        <div class="input-group-btn">\
        <input id="fileInput'+NBFILE+'" accept="application/pdf" type="file" style="display:none;" />\
        <input type="button" class="btn btn-default"  value="Parcourir" onclick="searchinput('+NBFILE+');"/>\
        </div>\
        </div>\
        </form>';
    document.getElementById('zone_nbFile').appendChild(MaDiv);

}

function rmFile(){
    var element = document.getElementById('zoneMobile'+NBFILE)// element à supprimer
    element.parentNode.removeChild(element);
    NBFILE=NBFILE-1;
}

function trashFILE(FileNum){
    var element = document.getElementById('zoneMobile'+FileNum)// element à supprimer
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


///PDF Display///

(function(a){a.createModal=function(b){defaults={title:"",message:"PDFVIEW",closeButton:true,scrollable:false};var b=a.extend({},defaults,b);var c=(b.scrollable===true)?'style="max-height: 420px;overflow-y: auto;"':"";html='<div class="modal fade" id="myModal">';html+='<div class="modal-dialog">';html+='<div class="modal-content">';html+='<div class="modal-header">';html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';if(b.title.length>0){html+='<h4 class="modal-title">'+b.title+"</h4>"}html+="</div>";html+='<div class="modal-body" '+c+">";html+=b.message;html+="</div>";html+='<div class="modal-footer">';if(b.closeButton===true){html+='<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>'}html+="</div>";html+="</div>";html+="</div>";html+="</div>";a("body").prepend(html);a("#myModal").modal().on("hidden.bs.modal",function(){a(this).remove()})}})(jQuery);


//PDF Gesture

function nextPage(){
    var pdf  = document.getElementById('pdf');
    //noinspection JSAnnotator
    pdf.getAttribute('pageNumber')= pdf.getAttribute('pageNumber')+1;

}

function prevPage(){
    var pdf  = document.getElementById('pdf');
    //noinspection JSAnnotator
    pdf.getElementById('pageNumber') = pdf.getElementById('pageNumber')+1;

}