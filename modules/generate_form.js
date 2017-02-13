/**
 * Created by maxime on 09/02/17.
 */

// Génère le formulaire HTML à partir des champs du pdf.

exports.generate_form=function generate_form_HTML(){
    var tab=genTab('form_fields.txt');
    document.open("/views/formulaire2.ejs");
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
}

function genTab(nomFic){
    var fs = require('fs');
    var contents = fs.readFileSync(nomFic).toString();
    var tableau=contents.split("---");
    for (var i=0; i<tableau.length; i++) {
        tableau[i]=tableau[i].split('\n');
        if(tableau[i][0]=='') tableau[i].shift();
        tableau[i].pop();
    }
    return tableau;
}


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
