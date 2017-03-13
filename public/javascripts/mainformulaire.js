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

function htmlToString(string) {
    var str=string.replace('&#233;', "é");
    return str;
}

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

//TODO CSS

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
    input.setAttribute("name",fieldName );
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