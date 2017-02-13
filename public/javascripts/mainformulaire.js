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

var socket;

socket=io();

socket.on("tab", function (tab) {
    alert("TEST");
    for (var i=0; i<tab.length; i++){

        switch (tab[i][0]){
            case 'FieldType: Text':
                createInputText(tab[i][1]);
                break;
            case 'FieldType: Button':
                createInputCheckbox(tab[i][1]);
                break;
            case 'FieldType: Choice':
                createInputList(tab[i][1], tab[i]);
                break;

        }
    }
})


function createInputText(fieldName){
    var p=document.createElement("p");
    p.appendChild(document.createTextNode(fieldName));
    var input=document.createElement("input");
    input.setAttribute("name", fieldName);
    input.setAttribute("type","text");
    document.getElementById('zone_form').appendChild(p);
    document.getElementById('zone_form').appendChild(input);
}

function createInputCheckbox(fieldName){
    var p=document.createElement("p");
    p.appendChild(document.createTextNode(fieldName));
    var input=document.createElement("input");
    input.setAttribute("name", fieldName);
    input.setAttribute("type","checkbox");
    document.getElementById('zone_form').appendChild(p);
    document.getElementById('zone_form').appendChild(input);
}


function createInputList(fieldName, tab){
    var p=document.createElement("p");
    p.appendChild(document.createTextNode(fieldName));
    var html='';
    for(var i=0; i<tab.size; i++){
        if(tab[i].contains("FieldStateOption")) {
            html = html + '<option value="' + tab[i].substring(18, tab[i].size) + '">' + tab[i].substring(18, tab[i].size) + '</option>';
        }
    }
    var select=document.createElement("select");
    select.innerHTML =html;
    select.setAttribute("name", fieldName);
    document.getElementById('zone_form').appendChild(p);
    document.getElementById('zone_form').appendChild(select);
}