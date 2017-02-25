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
                createInputCheckbox(tab[i][1].substring(11, this.size));
                break;
            case 'FieldType: Choice':
                createInputList(tab[i][1].substring(11, this.size), tab[i]);
                break;

        }
    }
}


function createInputText(fieldName){
    var p=document.createElement("p");
    p.setAttribute("class", "text-left");
    p.setAttribute("style", "color: black");
    p.appendChild(document.createTextNode(fieldName+" :"));
    var input=document.createElement("input");
    fieldName=fieldName
    input.setAttribute("name", fieldName);
    input.setAttribute("type","text");
    input.setAttribute("class", "form-control");
    document.getElementById('zone_form').appendChild(p);
    document.getElementById('zone_form').appendChild(input);
}

function createInputCheckbox(fieldName){
    var p=document.createElement("p");
    p.appendChild(document.createTextNode(fieldName+ " :"));
    p.setAttribute("class", "text-left");
    p.setAttribute("style", "color: black");
    var input=document.createElement("input");
    input.setAttribute("name",fieldName );
    input.setAttribute("type","checkbox");
    document.getElementById('zone_form').appendChild(p);
    document.getElementById('zone_form').appendChild(input);
}


function createInputList(fieldName, tab){
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
    document.getElementById('zone_form').appendChild(p);
    document.getElementById('zone_form').appendChild(select);
}