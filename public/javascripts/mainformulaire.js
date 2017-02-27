/**
 * Created by nahel on 09/02/2017.
 */

function include(fileName){
    document.write("<script type='text/javascript' src='javascripts/"+fileName+"'></script>" );
}

include("modules/bootstrap.js");
include("topAndBottom.js");
include("toggleBtn.js");
include("formulairejs/dragndrop.js");
include("formulairejs/parcourir.js");

function createForm(tab) {

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


function createInputText(fieldName){
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
    var div=document.createElement("div");
    div.setAttribute("style","display:inline-block; margin:5;");
    var p=document.createElement("p");
    p.appendChild(document.createTextNode(fieldName+ " :"));
    p.setAttribute("class", "text-left");
    p.setAttribute("style", "color: black");
    var input=document.createElement("input");
    input.setAttribute("name",fieldName );
    input.setAttribute("type","checkbox");
    document.getElementById('zone_form').appendChild(div);
    div.appendChild(p);
    div.appendChild(input);
}

function createInputRadio(fieldName, tab){
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
            titre.appendChild(document.createTextNode(tab[i].substring(18, tab[i].size)+ " :"));
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
    var div=document.createElement("div");
    div.setAttribute("style","margin:5;");
    var p=document.createElement("p");
    p.appendChild(document.createTextNode(fieldName+" :"));
    p.setAttribute("class", "text-left");
    p.setAttribute("style", "color: black");
    var html='';
    for(var i=0; i<tab.length; i++){
        if(tab[i].indexOf("FieldStateOption") != -1) {
            html = html + '<option value="' + tab[i].substring(18, tab[i].size) + '">' + tab[i].substring(18, tab[i].size) + '</option>';
        }
    }
    var select=document.createElement("select");
    select.innerHTML =html;
    select.setAttribute("name",fieldName );
    document.getElementById('zone_form').appendChild(div);
    div.appendChild(p);
    div.appendChild(select);
}