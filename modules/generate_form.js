/**
 * Created by maxime on 09/02/17.
 */

// Génère le formulaire HTML à partir des champs du pdf.

exports.generate_form=function generate_form_HTML(nomFic, out){
    var tab=genTab(nomFic,out);
    tab.shift();

    return tab;

}

function genTab(nomFic,out){
    var fs = require('fs');

    var contents = fs.readFileSync(nomFic).toString();
    var tableau=contents.split("---");
    for (var i=0; i<tableau.length; i++) {
        tableau[i]=tableau[i].split('\r\n');
        if(tableau[i][0]=='') tableau[i].shift();
        tableau[i].pop();
    }
    tableau.push(out);
    return tableau;
}

