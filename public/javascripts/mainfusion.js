/**
 * Created by jeromem on 06/12/16.
 */
function include(fileName){
    document.write("<script type='text/javascript' src='javascripts/"+fileName+"'></script>" );
}

//include("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");
//include("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js");
include("modules/bootstrap.js");
include("fusionjs/dragndrop.js");
include("fusionjs/filepath.js");
include("modules/pdf.js");
include("modules/pdf.worker.js");
include("topAndBottom.js");
include("modules/p5.js");
include("snake.js");
include("mainSnake.js");
include("toggleBtn.js");

var snake;
//empeche le scroll avec les fleches, et fait apparaitre le snake
$(document).keydown(function(e) {
    var key = e.which;
    var ar=new Array(33,34,35,36,37,38,39,40);
    var snakear=new Array(115, 83, 110, 78, 97, 65, 107, 75, 101, 69);
    if($.inArray(key,ar) > -1) {
        e.preventDefault();
    }
    if($.inArray(key,snakear) > -1) {
        if(key==115 || key == 83) {
            snake=1;
        }
        if((key==110 || key == 78) && snake==1) {
            snake=2;
        }
        if((key==97 || key == 65) && snake==2) {
            snake=3;
        }
        if((key==107 || key == 75) && snake==3) {
            snake=4;
        }
        if((key==101 || key == 69) && snake==4) {
            appelerSnake();
        }
    }
    else{
        snake=0;
    }

    return true;
});

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
