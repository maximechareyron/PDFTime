/**
 * Created by nahel on 27/01/2017.
 */

var s;
var scl=20;
var food;
var imgameover;
var countdown;
var timing=0;

var sketch = function( p ) {

    p.setup = function() {
        var cnv=p.createCanvas(600,600);
        cnv.parent('zone-pdf');
        s=new Snake(p);
        imgameover=p.loadImage("images/gameover.jpg");
        p.frameRate(13);
        p.pickLocation();
    };

    p.draw = function() {
        p.background(51);

        if(s.eat(food)){
            p.pickLocation();
        }
        if(s.death()){
            s=new Snake(p);
            p.pickLocation();
            countdown=30;
        }
        if(countdown>0){
            p.image(imgameover, p.width/2-100, p.height/2-100, 200, 200);
            countdown--;
            return;

        }
        if(timing>0){
            timing--;
        }
        s.update();
        s.show();

        p.fill(255, 0, 100);
        p.rect(food.x, food.y, scl, scl);
    };

    p.keyPressed = function () {
        if(p.keyCode === p.UP_ARROW && s.yspeed != 1 && timing==0){
            s.dir(0, -1);
            timing=1;
        }
        else if(p.keyCode === p.DOWN_ARROW && s.yspeed != -1 && timing==0){
            s.dir(0, 1);
            timing=1;
        }
        else if(p.keyCode === p.LEFT_ARROW && s.xspeed != 1 && timing==0){
            s.dir(-1, 0);
            timing=1;
        }
        else if(p.keyCode === p.RIGHT_ARROW && s.xspeed != -1 && timing==0){
            s.dir(1, 0);
            timing=1;
        }
    }

    p.pickLocation = function () {
        var cols=p.floor(p.width/scl);
        var rows=p.floor(p.height/scl);
        food=p.createVector(p.floor(p.random(cols)), p.floor(p.random(rows)));
        food.mult(scl);
    }


};



function appelerSnake() {
    var myp5=new p5(sketch);
}