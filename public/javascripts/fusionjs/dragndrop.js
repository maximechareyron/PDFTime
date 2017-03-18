/**
 * Created by nahel on 16/01/2017.
 */

var NBFILE = 0;
var IDREMOVE=0;

var dragNDropZone=document.getElementById('zone-pdf');

//Fonction permettant d'ajouter plusieurs listener d'un coup
function addListenerMulti(el, s, fn) {
    var evts = s.split(' ');
    for (var i=0, iLen=evts.length; i<iLen; i++) {
        el.addEventListener(evts[i], fn, false);
    }
}
//Permet d'empecher le navigateur d'ouvrir les fichiers à sa facons
addListenerMulti(window,'drag dragend dragover dragenter dragleave drop', function(e) {
    //e.preventDefault();
    e.stopPropagation();
});


$(function () {
    var dropZoneId = "zone-pdf";
    var dropZone = $("#" + dropZoneId);
    var ooleft = dropZone.offset().left;
    var ooright = dropZone.outerWidth() + ooleft;
    var ootop = dropZone.offset().top;
    var oobottom = dropZone.outerHeight() + ootop;
    dragNDropZone.addEventListener("dragover", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var inputFile = dropZone.find("input");
        var input = document.getElementById('input');

        document.getElementById('drop-zone').style.display = "visible";
        dragNDropZone.className="upload-drop-zone row view-pdf dragover";

        input.style.zIndex = 1;

        var x = e.pageX;
        var y = e.pageY;

        if (!(x < ooleft || x > ooright || y < ootop || y > oobottom)) {
            inputFile.offset({ top: y - 15, left: x - 100 });
        } else {
            inputFile.offset({ top: -400, left: -400 });
        }

    }, true);


    dragNDropZone.addEventListener("drop", function (e) {
        var input = document.getElementById('input');


        input.onchange = function () {
            if(input.files.length!=0) {
                var name = input.files[0].name;
            }
            if (document.getElementById('fileInput0') == null || document.getElementById('fileInput0').file == null ){
                if((content  = document.getElementById('contenant0')) != null)
                    content.parentNode.removeChild(content);
            }
            var extension = name.split('.').pop();
            if (!/(pdf)$/ig.test(extension)) {
                alert("Vous ne pouvez ajouter que des fichiers PDF.");
                dropZone.className="upload-drop-zone";
                return;
            }

            document.getElementById('drop-zone').style.display = "none";
            dragNDropZone.className="upload-drop-zone row view-pdf";
            dragNDropZone.style.border = "none";


            // Récupération des données :
            var file = input.files[0];
            var files = input.files;
            for (var i=0; i<files.length; i++) {
                var file = files[i];
                var name = file.name;
                addNewFile();
                addListenerZoneMobile(NBFILE);
                var inputpath=document.getElementById('inputPath'+NBFILE);
                inputpath.value=name;
            }

            oldInput = document.getElementById('fileInput'+NBFILE);
            oldInput.parentNode.removeChild(oldInput);
            input.style.zIndex = 0;
            input.id = "fileInput"+NBFILE;
            createNewInput();
            displayPdf(input,NBFILE);
        };

    }, true);

})

function createNewInput() {
    var newInput = document.createElement('input');
    newInput.type = 'file';
    newInput.id ='input';
    newInput.className = 'inputfile fileInput';
    newInput.accept = 'application/pdf';
    dragNDropZone.appendChild(newInput);
}



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
    zone_nbFile.insertBefore(div, zone_nbFile.firstElementChild.nextSibling);
    document.getElementById('inputPath'+NBFILE).value=name;
    document.getElementById('zone_nbFile').removeChild(document.getElementById('zoneMobile'+IDREMOVE));
    addListenerZoneMobile(NBFILE);
}

addListenerZoneMobile(0);
