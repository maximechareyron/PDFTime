/**
 * Created by jmddu_000 on 13/02/2017.
 */

function include(fileName){
    document.write("<script type='text/javascript' src='javascripts/"+fileName+"'></script>" );
}

include("modules/bootstrap.js");
include("modules/pdf.js");
include("modules/pdf.worker.js");
include("topAndBottom.js");
include("toggleBtn.js");
include("extractionjs/itemPagePrev.js");
include("extractionjs/dragndrop.js");
include("extractionjs/parcourir.js");


nbPagePdf =0 ;

//
// Disable workers to avoid yet another cross-origin issue (workers need the URL of
// the script to be loaded, and dynamically loading a cross-origin script does
// not work)
//
PDFJS.disableWorker = true;
//
// Asynchronous download PDF as an ArrayBuffer
//
function display(input){
    if (file = input.files[0]) {
        fileReader = new FileReader();
        fileReader.onload = function(ev) {
            cleanCanvas();
            console.log(ev);
            PDFJS.getDocument(fileReader.result).then(function getPdfHelloWorld(pdf) {
                //
                // Fetch the first page
                //
                nbPagePdf = pdf.numPages;
                console.log(pdf)
                for(i = 1 ;i<=nbPagePdf;i++) {
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


    if(element.className == "btn btn-md btn-circle btn-default") {
        element.className = "btn btn-md btn-circle btn-primary";
        document.getElementById(thingID).style.display = "";
    }
    else {
        element.className = "btn btn-md btn-circle btn-default";
        document.getElementById(thingID).style.display = "none";
    }

}

function cleanCanvas() {
    for(var i=1;i<=nbPagePdf;i++) {
        var thumb = document.getElementById("thumb"+i);
        if (thumb != null) {
            document.getElementById('zone-pdf').removeChild(thumb);
        }
    }
}