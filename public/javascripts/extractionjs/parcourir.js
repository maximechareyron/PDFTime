/**
 * Created by jmddu_000 on 24/02/2017.
 */

function searchinput() {
    var input = document.getElementById("fileInput");
    input.click();
    input.onchange = function () {
        var path = document.getElementById('fileInput').value;

        var file = input.files[0];
        var name = file.name;
        if (name.substring(name.length - 4, name.length) != ".pdf") {
            alert("Vous ne pouvez ajouter que des fichiers PDF.")
            return;
        }
        document.getElementById('inputPath').value = name;
        document.getElementById('inputPath').file = file;

        display(input);
    }
}