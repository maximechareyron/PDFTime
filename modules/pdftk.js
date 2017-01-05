var util = require('util')
var exec = require('child_process').exec;


// Affiche les erreurs à l'exécution de la commande pdfTK
function putsErrors(error, stdout, stderr) {
    if(error){
        console.log("exec error :"+error);
        // Appel de la vue d'erreur ? Affichage d'un message d'erreur dans le navigateur
    }
}

function executePDFtkCommand(cmd){
    exec(cmd, putsErrors); //Execute et affiche la sortie de cmd
}

// Prend en paramètre un tableau de chemins de fichiers
function fusion(tabfic)
{
    var listefichiers = "";
    for (var i=0; i<tabfic.length; i++)
        listefichiers = listefichiers + " " + tabfic[i];
    var cmd = "pdftk " + listefichiers + " cat output merge.pdf";
    executePDFtkCommand(cmd);
}

exports.fusion=fusion;