/**
 * Created by maxime on 09/02/17.
 */

// Génère le formulaire HTML à partir des champs du pdf.

exports.generate_form=function generate_form_HTML(){
    var tab=genTab('form_fields.txt');
    tab.shift();

    return tab;
    /*for (var i=0; i<tab.length; i++){

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
    */
}

function genTab(nomFic){
    var fs = require('fs');
    var contents = fs.readFileSync(nomFic).toString();
    var tableau=contents.split("---");
    for (var i=0; i<tableau.length; i++) {
        tableau[i]=tableau[i].split('\r\n');
        if(tableau[i][0]=='') tableau[i].shift();
        tableau[i].pop();
    }
    return tableau;
}

