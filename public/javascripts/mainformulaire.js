/**
 * Created by nahel on 09/02/2017.
 */

// Disable workers to avoid yet another cross-origin issue (workers need the URL of
// the script to be loaded, and dynamically loading a cross-origin script does
// not work)
//
var nbPagePdf;

function include(fileName){
    document.write("<script type='text/javascript' src='javascripts/"+fileName+"'></script>" );
}

include("modules/bootstrap.js");
include("modules/pdf.worker.js");
include("modules/pdf.js");
include("topAndBottom.js");
include("toggleBtn.js");
include("modules/p5.js");
include("snake.js");
include("navball.js");
include("formulairejs/dragndrop.js");
include("formulairejs/parcourir.js");
include("extractionjs/itemPagePrev.js");

function htmlToString(string) {
    var str=string.replace('&#233;', "é");
    return str;
}

function display(input){
    var file = input.files[0];
    var name = file.name;
    if (name.substring(name.length - 4, name.length) != ".pdf") {
        alert("Vous ne pouvez ajouter que des fichiers PDF.")
        return;
    }
    document.getElementById('inputPath').value = name;
    document.getElementById('inputPath').file = file;
    var reader = new FileReader();

    //attach event handlers here :
    reader.addEventListener('loadend', function (e, file) {
        var bin = this.result;
        var pdf = document.createElement('object');
        pdf.type = "application/pdf";
        pdf.data = bin;
        pdf.width = "100%";
        pdf.height = "500";
        pdf.id = "pdf";
        var oldpdf = document.getElementById('pdf');
        if (oldpdf != null) {
            document.getElementById('zone-pdf').removeChild(oldpdf);
        }
        document.getElementById('zone-pdf').appendChild(pdf);
    });

    dropPlace  = document.getElementById('drop-zone');
    dropPlace.parentNode.removeChild(dropPlace);

    reader.readAsDataURL(file);
}
function createForm(tab) {
    createInputHidden(tab[tab.length-1]);
    for (var i=0; i<tab.length; i++){
        switch (tab[i][0]){
            case 'FieldType: Text':
                createInputText(tab[i][1].substring(11, this.size));
                break;
            case 'FieldType: Button':
                if(tab[i][3].indexOf("FieldValue") != -1){
                    createInputRadio(tab[i][1].substring(11, this.size), tab[i]);
                }
                else {
                    createInputCheckbox(tab[i][1].substring(11, this.size));
                }
                break;
            case 'FieldType: Choice':
                createInputList(tab[i][1].substring(11, this.size), tab[i]);
                break;

        }
    }
}

//TODO CSS

function createInputHidden(fileName){
    var input=document.createElement("input");
    input.setAttribute("name", "nomOut");
    input.setAttribute("value", fileName);
    input.setAttribute("type","hidden");
    document.getElementById('zone_form').appendChild(input);
}

function createInputText(fieldName){
    fieldName=htmlToString(fieldName);
    var div=document.createElement("div");
    div.setAttribute("style","margin:5;");
    var p=document.createElement("p");
    p.setAttribute("class", "text-left");
    p.setAttribute("style", "color: black;");
    p.appendChild(document.createTextNode(fieldName+" :"));
    var input=document.createElement("input");
    input.setAttribute("name", fieldName);
    input.setAttribute("type","text");
    input.setAttribute("class", "form-control");
    document.getElementById('zone_form').appendChild(div);
    div.appendChild(p);
    div.appendChild(input);
}

function createInputCheckbox(fieldName){
    fieldName=htmlToString(fieldName);
    var div=document.createElement("div");
    div.setAttribute("style","display:inline-block; margin:5;");
    var p=document.createElement("p");
    p.appendChild(document.createTextNode(fieldName+ " :"));
    p.setAttribute("class", "text-left");
    p.setAttribute("style", "color: black");
    var input=document.createElement("input");
    input.setAttribute("name",fieldName+"chk" );
    input.setAttribute("type","checkbox");
    document.getElementById('zone_form').appendChild(div);
    div.appendChild(p);
    div.appendChild(input);
}

function createInputRadio(fieldName, tab){
    fieldName=htmlToString(fieldName);
    var p=document.createElement("p");
    p.appendChild(document.createTextNode(fieldName+ " :"));
    p.setAttribute("class", "text-left");
    p.setAttribute("style", "color: black");
    document.getElementById('zone_form').appendChild(p);
    for(var i=0; i<tab.length; i++){
        if(tab[i].indexOf("FieldStateOption") != -1 && tab[i].indexOf("Off") == -1) {
            var div=document.createElement("div");
            div.setAttribute("style","display:inline-block; margin:5;");
            var titre=document.createElement("p");
            var textTitre=htmlToString(tab[i].substring(18, tab[i].size));
            titre.appendChild(document.createTextNode(textTitre+ " :"));
            titre.setAttribute("class", "text-left");
            titre.setAttribute("style", "color: black");
            var input=document.createElement("input");
            input.setAttribute("name",fieldName );
            input.setAttribute("value", tab[i].substring(18, tab[i].size));
            input.setAttribute("type","radio");
            document.getElementById('zone_form').appendChild(div);
            div.appendChild(titre);
            div.appendChild(input);
        }
    }
}

function createInputList(fieldName, tab){
    fieldName=htmlToString(fieldName);
    var div=document.createElement("div");
    div.setAttribute("style","margin:5;");
    var p=document.createElement("p");
    p.appendChild(document.createTextNode(fieldName+" :"));
    p.setAttribute("class", "text-left");
    p.setAttribute("style", "color: black");
    var html='';
    for(var i=0; i<tab.length; i++){
        if(tab[i].indexOf("FieldStateOption") != -1) {
            html = html + '<option value="' + tab[i].substring(18, tab[i].size) + '">' + htmlToString(tab[i].substring(18, tab[i].size)) + '</option>';
        }
    }
    var select=document.createElement("select");
    select.innerHTML =html;
    select.setAttribute("name",fieldName);
    document.getElementById('zone_form').appendChild(div);
    div.appendChild(p);
    div.appendChild(select);
}