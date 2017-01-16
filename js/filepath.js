/**
 * Created by nahel on 16/01/2017.
 */

function searchinput(nbfile) {
    var input=document.getElementById("fileInput"+nbfile);
    input.click();
    input.onchange=function() {
        var path = document.getElementById('fileInput'+nbfile).value;

        var file=input.files[0];
        var name=file.name;
        if(name.substring(name.length-4,name.length) != ".pdf") {
            alert("Vous ne pouvez ajouter que des fichiers PDF.")
            return;
        }
        document.getElementById('inputPath'+nbfile).value=name;

        var reader = new FileReader();

        //attach event handlers here :
        reader.addEventListener('loadend', function(e, file) {
            var bin           = this.result;
            var pdf=document.createElement('object');
            pdf.type="application/pdf";
            pdf.data=bin;
            pdf.width="100%";
            pdf.height="600";
            pdf.id="pdf";
            var oldpdf=document.getElementById('pdf');
            if(oldpdf!=null) {
                document.getElementById('zone-pdf').removeChild(oldpdf);
            }
            document.getElementById('zone-pdf').appendChild(pdf);

        });

        reader.readAsDataURL(file);


    }
}

function searchoutput() {
    document.getElementById('fileOutput').click();
    document.getElementById('fileOutput').onchange=function() {
        var repertory = document.getElementById('fileOutput').files[0];
        document.getElementById('outputPath').value=repertory.name;
    }
}