/**
 * Created by nahel on 09/02/2017.
 */

function include(fileName){
    document.write("<script type='text/javascript' src='javascripts/"+fileName+"'></script>" );
}

include("modules/bootstrap.js");
include("topAndBottom.js");
include("toggleBtn.js");
include("formulairejs/dragndrop.js");
include("formulairejs/parcourir.js");