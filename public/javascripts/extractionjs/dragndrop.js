/**
 * Created by jmddu_000 on 24/02/2017.
 */

var dropZone=document.getElementById('drop-zone');

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
    var file = dt.files[0];
    var inputpath = document.getElementById("inputPath");
    inputpath.name = file.name;
    inputpath.file = file;

    display(dt);
});