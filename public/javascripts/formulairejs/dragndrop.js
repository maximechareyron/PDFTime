/**
 * Created by jmddu_000 on 24/02/2017.
 */

//Fonction permettant d'ajouter plusieurs listener d'un coup
function addListenerMulti(el, s, fn) {
    var evts = s.split(' ');
    for (var i=0, iLen=evts.length; i<iLen; i++) {
        el.addEventListener(evts[i], fn, false);
    }
}
//Permet d'empecher le navigateur d'ouvrir les fichiers à sa facons
addListenerMulti(window,'drag dragend dragover dragenter dragleave drop', function(e) {
   // e.preventDefault();
    e.stopPropagation();
});


//Sources:
//http://stackoverflow.com/questions/8006715/drag-drop-files-into-standard-html-file-input
$(function () {
    var dropZoneId = "zone-pdf";
    var dragNDropZone=document.getElementById('zone-pdf');
    var dropZone = $("#" + dropZoneId);
    var ooleft = dropZone.offset().left;
    var ooright = dropZone.outerWidth() + ooleft;
    var ootop = dropZone.offset().top;
    var oobottom = dropZone.outerHeight() + ootop;
    var input = document.getElementById('input');
    var inputFile = dropZone.find("input");
    dragNDropZone.addEventListener("dragover", function (e) {
        e.preventDefault();
        e.stopPropagation();
        input.style.zIndex = 1;

        document.getElementById('drop-zone').style.display = "visible";
        dragNDropZone.className="upload-drop-zone row view-pdf dragover";

        var x = e.pageX;
        var y = e.pageY;

        if (!(x < ooleft || x > ooright || y < ootop || y > oobottom)) {
            inputFile.offset({ top: y - 15, left: x - 100 });
        } else {
            inputFile.offset({ top: -400, left: -400 });
        }

    }, true);


    dragNDropZone.addEventListener("drop", function (e) {

        input.onchange = function () {

            if(input.files.length!=0) {
                var name = input.files[0].name;
            }
            var extension = name.split('.').pop();
            if (!/(pdf)$/ig.test(extension)) {
                alert("Vous ne pouvez ajouter que des fichiers PDF.");
                dropZone.className="upload-drop-zone";
                return;
            }

            dropZone.className="upload-drop-zone";

            document.getElementById('drop-zone').style.display = "none";
            dragNDropZone.className="upload-drop-zone row view-pdf";
            dragNDropZone.style.border = "none";


            // Récupération des données :
            var file = input.files[0];
            var inputpath = document.getElementById("inputPath");
            inputpath.value = file.name;

            display(input);
            input.style.zIndex = 0;

            var path = document.getElementById('input').value;

            var file = input.files[0];
            var name = file.name;
            if (name.substring(name.length - 4, name.length) != ".pdf") {
                alert("Vous ne pouvez ajouter que des fichiers PDF.")
                return;
            }
            document.getElementById('inputPath').value = name;
            document.getElementById('inputPath').file = file;

        };

    }, true);

})