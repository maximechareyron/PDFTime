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
exports.fusion=function fusion(tabfic,out){
    var listefichiers = "";
    for (var i=0; i<tabfic.length; i++)
        listefichiers = listefichiers + " " +tabfic[i];
    var cmd = "pdftk " + listefichiers + " cat output "+out;
    execSync(cmd);
    exec('rm routes/uploads/*');
}

// Prend en paramètre un fichier dont il faut extraire des pages
exports.extraction=function extraction(nums, fichier, out){

    var cmd="pdftk " + fichier + " cat " + nums + " output " + out;
    execSync(cmd);
    // cmd = "rm " + fichier;
    exec("rm " + fichier);
}

// Prend en paramètre un fichier pdf et génère un fichier txt avec les champs
exports.get_form_fields=function get_form_fields(fields,out) {

    var cmd = "pdftk "+ out+" dump_data_fields output "+fields;
    execSync(cmd);
}


exports.remplirPdf=function remplirPdf(out,fdf,infile){
    var cmd="pdftk "+ infile +" fill_form "+ fdf +" output "+out;
    execSync(cmd);
    exec('rm '+fdf);
    exec('rm routes/uploads/*');
}
