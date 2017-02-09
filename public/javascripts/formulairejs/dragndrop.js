/**
 * Created by nahel on 09/02/2017.
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

    var files = dt.files;
    var file = files[0];
    var name = file.name;
    var inputpath=document.getElementById('inputPath');
    inputpath.value=name;

    var reader = new FileReader();

    //attach event handlers here :
    reader.addEventListener('loadend', function(e, file) {
        var bin = this.result;
        var pdf = document.createElement('object');
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
/*
        var form = document.createElement("form");
        form.setAttribute("action", "/formulaire/drop");
        form.setAttribute("method", "post");
        form.setAttribute("enctype", "multipart/form-data");

        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "file");
        hiddenField.setAttribute("name", name);
        hiddenField.setAttribute("value", file);

        form.appendChild(hiddenField);

        document.body.appendChild(form);
        form.submit();
*/
    });

    reader.readAsDataURL(file);

});