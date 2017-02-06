/**
 * Created by jmddu_000 on 06/02/2017.
 */
function active(thingID) {
    var element = document.getElementById(thingID)
    if (element.className == "btn btn-lg btn-default" ) {
        element.className = "btn btn-lg btn-primary";
    }
    else
    {
        element.className = "btn btn-lg btn-default";
    }

}