/**
 * Created by maxime on 09/02/17.
 */

// Génère le formulaire HTML à partir des champs du pdf.

exports.generate_form=function generate_form_HTML(){
    tab=genTab('form_fields.txt');
    document.open("/views/formulaire2.ejs");
    for (var i=0; i<tab.length; i++){
        switch (tab[i][0]){
            case 'FieldType: Text':
                break;
        }
    }
}

function genTab(nomFic){
    var fs = require('fs');
    var contents = fs.readFileSync(nomFic).toString();
    tableau=contents.split("---");
    for (var i=0; i<tableau.length; i++) {
        tableau[i]=tableau[i].split('\n');
        if(tableau[i][0]=='') tableau[i].shift();
        tableau[i].pop();
    }
    return tableau;
}
