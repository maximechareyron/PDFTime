/**
 * Created by nahel on 09/02/2017.
 */

function searchinput() {
    var input = document.getElementById("input");
    input.click();
    input.onchange = function () {
        var path = document.getElementById('input').value;

        var file = input.files[0];
        var name = file.name;
        if (name.substring(name.length - 4, name.length) != ".pdf") {
            alert("Vous ne pouvez ajouter que des fichiers PDF.")
            return;
        }
        document.getElementById('inputPath').value = name;
        document.getElementById('inputPath').file = file;
        var reader = new FileReader();

        //attach event handlers here :
        reader.addEventListener('loadend', function (e, file) {
            var bin = this.result;
            var pdf = document.createElement('object');
            pdf.type = "application/pdf";
            pdf.data = bin;
            pdf.width = "100%";
            pdf.height = "500";
            pdf.id = "pdf";
            var oldpdf = document.getElementById('pdf');
            if (oldpdf != null) {
                document.getElementById('zone-pdf').removeChild(oldpdf);
            }
            document.getElementById('zone-pdf').appendChild(pdf);
        });

        dropPlace  = document.getElementById('drop-zone');
        dropPlace.parentNode.removeChild(dropPlace);

        reader.readAsDataURL(file);
    }
}