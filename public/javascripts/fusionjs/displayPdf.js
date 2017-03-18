/**
 * Created by jmddu_000 on 13/03/2017.
 */

// Disable workers to avoid yet another cross-origin issue (workers need the URL of
// the script to be loaded, and dynamically loading a cross-origin script does
// not work)
//
PDFJS.disableWorker = true;
//
// Asynchronous download PDF as an ArrayBuffer
//
function displayPdf(input,nbfile){
    var cvstest = document.getElementById(nbfile);
    if ( cvstest != null)
        cvstest.parentNode.removeChild(cvstest);
    if (file = input.files[0]) {
        fileReader = new FileReader();
        fileReader.onload = function() {
            PDFJS.getDocument(fileReader.result).then(function getPdfHelloWorld(pdf) {
                pdf.getPage(1).then(function getPageHelloWorld(page) {
                    var scale = 0.30;
                    var viewport = page.getViewport(scale);
                    //
                    // Prepare canvas using PDF page dimensions
                    //
                    var divcvs = document.createElement('div');
                    divcvs.id = nbfile;
                    divcvs.className="col-sm-6 text-center";
                    divcvs.style.margin = "1%";
                    divcvs.style.marginLeft = "20%";
                    divcvs.style.padding = "10px";
                    divcvs.style.color ="#ccc";
                    divcvs.width = viewport.width;
                    divcvs.height = viewport.height;
                    divcvs.style.backgroundColor="#2c2c2c";
                    divcvs.style.borderRadius="10%";
                    divcvs.innerHTML="<canvas id='"+file.name+"' ></canvas>\
                    <p>"+file.name+"</p>";

                    document.getElementById("zone-pdf").appendChild(divcvs);
                    var canvas = document.getElementById(file.name);
                    var context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    //
                    // Render PDF page into canvas context
                    //
                    var task = page.render({canvasContext: context, viewport: viewport});
                    task.promise.then(function () {
                        //console.log(canvas.toDataURL('image/jpeg'));
                    });

                });
            }, function(error){
                console.log(error);
            });

        };
        fileReader.readAsArrayBuffer(file);
    }
}

function cleanPdf(name){

    var thumb = document.getElementById(name);
    if (thumb != null) {
        document.getElementById('zone-pdf').removeChild(thumb);
    }
}