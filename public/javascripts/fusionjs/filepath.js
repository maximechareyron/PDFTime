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
            alert("Vous ne pouvez ajouter que des fichiers PDF.");
            return;
        }
        document.getElementById('inputPath'+nbfile).value=name;
        document.getElementById('inputPath'+nbfile).file=file;


        document.getElementById('drop-zone').style.display = "none";
        dragNDropZone.className="upload-drop-zone row view-pdf";
        dragNDropZone.style.border = "none";

        displayPdf(input,nbfile);

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