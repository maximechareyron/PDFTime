var util = require('util')
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;

// Affiche les erreurs à l'exécution de la commande pdfTK
function putsErrors(error,res) {
    if(error){
        console.log("exec error :"+error);
        // Appel de la vue d'erreur ? Affichage d'un message d'erreur dans le navigateur
    }

}


// Prend en paramètre un tableau de chemins de fichiers
exports.fusion=function fusion(tabfic){
    var listefichiers = "";
    for (var i=0; i<tabfic.length; i++)
        listefichiers = listefichiers + " " + "routes/uploads/"+tabfic[i];
    var cmd = "pdftk " + listefichiers + " cat output merge.pdf";
    execSync(cmd);
    exec('rm routes/uploads/*');

}


