/**
 * Created by jeromem on 06/12/16.
 */
+ function($) {
    'use strict';

    // UPLOAD CLASS DEFINITION
    // ======================

    var dropZone = document.getElementById('drop-zone');

    var startUpload = function(files) {
        console.log(files)
    }

    dropZone.ondrop = function(e) {
        e.preventDefault();
        this.className = 'upload-drop-zone';

        startUpload(e.dataTransfer.files)
    }

    dropZone.ondragover = function() {
        this.className = 'upload-drop-zone drop';
        return false;
    }

    dropZone.ondragleave = function() {
        this.className = 'upload-drop-zone';
        return false;
    }

}(jQuery)




//Fonction pour la page extraction


function visibility(thingId)
{
        var targetElement;
        targetElement = document.getElementById(thingId) ;
        if (targetElement.style.display == "none" )
        {
            targetElement.style.display = "" ;
            if(thingId=='my_help') {
                document.getElementById('btnHelp').className = "btn btn-info";
            }
        }
        else {
            targetElement.style.display = "none" ;

            if(thingId=='my_help') {
                document.getElementById('btnHelp').className = "btn btn-default";
            }
        }
}


//Fonction pour la pages de fusion

function addNewFile() {

    var MaDiv = document.createElement('div');
    MaDiv.className='text-left';
    MaDiv.id=('add');
    MaDiv.innerHTML='Selectionner un PDF à fusionner\
                        <form>\
                        <div class="input-group" style="margin-bottom:2.5%;">\
                            <input type="text" class="form-control" placeholder="Chemin vers fichier">\
                            <div class="input-group-btn">\
                            <button class="btn btn-default" type="file">\
                            Parcourir\
                            </button>\
                            </div>\
                            </div>\
                            </form>';
    document.getElementById('zone_nbFile').appendChild(MaDiv);

}

function rmFile(){
    var element = document.getElementById('add')// element à supprimer
    element.parentNode.removeChild(element);

}
