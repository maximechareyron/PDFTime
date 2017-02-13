/**
 * Created by jmddu_000 on 31/01/2017.
 */

function requireTop(){
    document.write('\
        <!DOCTYPE html>\
        <html lang="fr" xmlns="http://www.w3.org/1999/html">\
        <head>\
        <title>PDF Time</title>\
        <meta charset="utf-8">\
        <link rel="stylesheet" type="text/css" href="stylesheets/bootstrap.css">\
        <link rel="stylesheet" type="text/css" href="stylesheets/MainWin.css">\
        </head>\
        <body class="animate-in" style="background-color:#222;color:#ccc;">\
        <center>\
        <div class="navbar navbar-inverse">\
            <div class="col-sm-6 col-sm-offset-4">\
            <form method="get" action="/"><input type="image" src="images/logo.svg" alt="logo" width="100" class="col-sm-3"/></form>\
            <div class="col-sm-4">\
            <h1>PDF Time</h1>\
    ');
}

function requireBottom(){
    document.write('\ <footer class="col-sm-12" style="background-color: #222;color:#ccc;">\
        Maxime CHAREYRON - Nahel CHAZOT - Alexandre DONNE - Jérome MASSARD - Ivan SCHMIDT \
        </footer>\
        </body>\
        </html>\
        ');
}