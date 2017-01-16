/**
 * Created by nahel on 16/01/2017.
 */

var NBFILE = 0;
var IDREMOVE=0;
var dropZone = document.getElementById('drop-zone');


//Fonction permettant d'ajouter plusieurs listener d'un coup
function addListenerMulti(el, s, fn) {
    var evts = s.split(' ');
    for (var i=0, iLen=evts.length; i<iLen; i++) {
        el.addEventListener(evts[i], fn, false);
    }
}
//Permet d'empecher le navigateur d'ouvrir les fichiers à sa facons
addListenerMulti(window,'drag dragend dragover dragenter dragleave drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
});


dropZone.addEventListener('dragover', function(e) {
    e.stopPropagation();
    e.preventDefault();
    dropZone.className = "upload-drop-zone dragover";

});

dropZone.addEventListener('dragleave', function(e) {
    dropZone.className="upload-drop-zone";
});


dropZone.addEventListener('drop', function(e) {
    e.stopPropagation();
    e.preventDefault();
    var dt    = e.dataTransfer;
    if(dt.files.length!=0) {
        var name = dt.files[0].name;
    }
    if(name==null || name.substring(name.length-4,name.length) != ".pdf"){
        alert("Vous ne pouvez ajouter que des fichiers PDF.");
        dropZone.className="upload-drop-zone";
        return;
    }
    dropZone.className="upload-drop-zone";
    $('#zoneDropText').replaceWith('<b id="zoneDropText">Fichier ajouté !</b>');
    window.setTimeout(function(){
        $('#zoneDropText').replaceWith('<b id="zoneDropText">Glisser-Déposer un PDF.</b>');
    }, 5000);

    // Récupération des données :

    var files = dt.files;
    for (var i=0; i<files.length; i++) {
        var file = files[i];
        var reader = new FileReader();
        var name = file.name;
        //attach event handlers here :
        reader.addEventListener('loadend', function(e, file) {
            var bin           = this.result;
            var pdf=document.createElement('object');
            pdf.type="application/pdf";
            pdf.data=bin;
            pdf.width="100%";
            pdf.height="600";
            pdf.id="pdf";
            var oldpdf=document.getElementById('pdf');
            if(oldpdf!=null) {
                document.getElementById('zone-pdf').removeChild(oldpdf);
            }
            document.getElementById('zone-pdf').appendChild(pdf);
            addNewFile();
            addListenerZoneMobile(NBFILE);
            document.getElementById('inputPath'+NBFILE).value=name;

        });
        reader.readAsDataURL(file);
    }

    return false;
});

function addListenerZoneMobile(id){
    document.getElementById('tiretMove'+id).addEventListener('dragstart', function (e) {
        var dt=e.dataTransfer;
        dt.setDragImage(document.getElementById('contenant'+id),70,50);
        dt.data=document.getElementById('inputPath'+id).value;
        IDREMOVE=id;
    });

    document.getElementById('newplace'+id).addEventListener('dragover', function(e) {
        e.stopPropagation();
        e.preventDefault();
        document.getElementById('newplace'+id).className="newplace dragover";
    });

    document.getElementById('newplace'+id).addEventListener('dragleave', function(e) {
        var newplace=document.getElementById('newplace'+id);
        newplace.className="newplace";
    });

    document.getElementById('newplace'+id).addEventListener('drop', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var newplace=document.getElementById('newplace'+id);
        var zoneMobile=document.getElementById('zoneMobile'+id);
        var div=createNewFile();
        var name=document.getElementById('inputPath'+IDREMOVE).value;
        newplace.className="newplace";
        zoneMobile.parentNode.insertBefore(div,zoneMobile.nextSibling);
        document.getElementById('inputPath'+NBFILE).value=name;
        document.getElementById('zone_nbFile').removeChild(document.getElementById('zoneMobile'+IDREMOVE));
        addListenerZoneMobile(NBFILE);

    });

}

function insererDebut(){
    var div=createNewFile();
    var name=document.getElementById('inputPath'+IDREMOVE).value;
    var zone_nbFile = document.getElementById("zone_nbFile");
    //Compliqué de rajouter une division donc on prend la division mere, et c'est le 5eme élément, donc 4*nextElementSibling
    zone_nbFile.insertBefore(div, zone_nbFile.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling);
    document.getElementById('inputPath'+NBFILE).value=name;
    document.getElementById('zone_nbFile').removeChild(document.getElementById('zoneMobile'+IDREMOVE));
    addListenerZoneMobile(NBFILE);
}

addListenerZoneMobile(0);
