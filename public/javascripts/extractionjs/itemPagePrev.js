/**
 * Created by jmddu_000 on 13/02/2017.
 */

function newThumb(page,zone){
    var MaDiv = document.createElement('div');
    MaDiv.className='text-center col-sm-2';
    MaDiv.style.color = "black";
    MaDiv.id=('thumb'+page);
    MaDiv.innerHTML='<div class="col-sm-2">\
    <canvas id="canvasPage'+page+'" style="border:1px solid black" onclick="check('+page+');" onblur="onLostFocus();"></canvas>\
    <input type="checkbox" id="page'+page+'" name="page'+page+'">'+page+'\
    </div>';
    document.getElementById(zone).appendChild(MaDiv);
}

function setPage2Canvas(pdf,i) {
    pdf.getPage(i).then(function getPageHelloWorld(page) {
        var scale = 0.25;
        var viewport = page.getViewport(scale);
        //
        // Prepare canvas using PDF page dimensions
        //
        var canvas = document.getElementById("canvasPage"+i);
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
}

function check(num){
    if( document.getElementById("numsPages").value == null)
        var op = "";
    else
        op = document.getElementById("numsPages").value;

    if(document.getElementById("page"+num).checked == true){
        document.getElementById("page"+num).checked = false;
        op = op.replace(" "+num,"");
    }
    else{
        document.getElementById("page" + num).checked = true;
        op += " "+num;
    }

    document.getElementById("numsPages").value = op;
}
/*
function onLostFocus(){
    var champ = document.getElementById("numsPages");
}*/
/*
function convertChoice2ER(nbPages){
    var extractPagesString = "";
    for(var i=1;i<nbPages;i++){
        if (document.getElementById("page"+i).checked == true)
            extractPagesString += i+" ";
    }
    document.getElementById("numsPages").setAttribute("value", extractPagesString);
}

*/
