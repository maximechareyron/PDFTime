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
        document.getElementById('inputPath'+nbfile).file=file;
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

        var fileinputs=document.getElementsByClassName('fileInput');
        document.getElementById('validButton').disabled= false;
        for(var i= 0; i < fileinputs.length; i++)
        {
            if(fileinputs[i].value==""){
                document.getElementById('validButton').disabled= true;
            }
        }
    }

}