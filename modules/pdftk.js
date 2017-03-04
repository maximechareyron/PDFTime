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
    var cmd = "pdftk " + listefichiers + " cat output result.pdf";
    execSync(cmd);
    exec('rm routes/uploads/*');
}

// Prend en paramètre un fichier dont il faut extraire des pages
exports.extraction=function extraction(nums){
    fichier="routes/uploads/extract.pdf";
    var cmd="pdftk " + fichier + " cat " + nums + " output result.pdf" ;
    execSync(cmd);
    exec('rm routes/uploads/*');
}

// Prend en paramètre un fichier pdf et génère un fichier txt avec les champs
exports.get_form_fields=function get_form_fields() {
    var cmd = "pdftk routes/uploads/formfic.pdf dump_data_fields output form_fields.txt";
    execSync(cmd);
}


exports.remplirPdf=function remplirPdf(){
    var cmd="pdftk /routes/uploads/formfic.pdf fill_form formrempli.fdf output result.pdf";
    execSync(cmd);
    exec('rm formrempli.fdf ');
    exec('rm routes/uploads/*');

}
