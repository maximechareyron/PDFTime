/**
 * Created by jmddu_000 on 13/02/2017.
 */

function include(fileName){
    document.write("<script type='text/javascript' src='javascripts/"+fileName+"'></script>" );
}

include("modules/bootstrap.js");
include("modules/pdf.worker.js");
include("topAndBottom.js");
include("toggleBtn.js");
include("modules/p5.js");
include("snake.js");
include("navball.js");
include("extractionjs/itemPagePrev.js");
include("extractionjs/dragndrop.js");
include("extractionjs/parcourir.js");


// Disable workers to avoid yet another cross-origin issue (workers need the URL of
// the script to be loaded, and dynamically loading a cross-origin script does
// not work)
//
PDFJS.disableWorker = true;
//
// Asynchronous download PDF as an ArrayBuffer
//

var nbPagePdf;

function display(input){
    if (file = input.files[0]) {
        fileReader = new FileReader();
        fileReader.onload = function() {
            cleanCanvas();
            PDFJS.getDocument(fileReader.result).then(function getPdfHelloWorld(pdf) {

                nbPagePdf = pdf.numPages;

                for(var i = 1 ;i<=nbPagePdf;i++) {
                    newThumb(i, 'zone-pdf');
                    setPage2Canvas(pdf,i);
                }
            }, function(error){
                console.log(error);
            });

        };
        fileReader.readAsArrayBuffer(file);
    }
}



function visibilityHelp(thingID){
    var element = document.getElementById('btnHelp');

    if(element.className.indexOf("btn btn-md btn-circle btn-default") != -1) {
        element.className = "btn btn-md btn-circle btn-primary";
        document.getElementById(thingID).style.display = "";
    }
    else {
        element.className = "btn btn-md btn-circle btn-default";
        document.getElementById(thingID).style.display = "none";
    }
}

function onLostFocus(){
    var champ = document.getElementById("numsPages").value;
    champ = champ.replace(/[a-zA-Z]/g,' ');
    document.getElementById("numsPages").value = champ;
}



function cleanCanvas() {
    document.getElementById("numsPages").value = "";
    for(var i=1;i<=nbPagePdf;i++) {
        var thumb = document.getElementById("thumb"+i);
        if (thumb != null) {
            document.getElementById('zone-pdf').removeChild(thumb);
        }
    }
}