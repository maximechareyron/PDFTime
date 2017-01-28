/**
 * Created by nahel on 27/01/2017.
 */
function Snake(p){
    this.x = 20;
    this.y = 20;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail=[];
    this.p=p;

    this.death=function () {

        if(this.x < 0 || this.x > p.width || this.y < 0 || this.y > p.height)
            return true;
        for(var i = 0; i<this.tail.length; i++){
            var pos = this.tail[i];
            var d = p.dist(this.x, this.y, pos.x, pos.y);
            if(d<1){
                return true;
            }

        }
        return false;

    }

    this.update=function(){

        if(this.total === this.tail.length) {
            for (var i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        this.tail[this.total-1] = p.createVector(this.x, this.y);

        this.x=this.x+this.xspeed*scl;
        this.y=this.y+this.yspeed*scl;

    }

    this.show=function () {
        p.fill(255);
        for (var i = 0; i < this.tail.length; i++) {
            p.rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        p.rect(this.x, this.y, scl, scl);
    }

    this.dir=function(x,y){
        this.xspeed=x;
        this.yspeed=y;
    }

    this.eat=function(pos){
        var d= p.dist(this.x, this.y, pos.x, pos.y);
        if(d<1){
            this.total++;
            return true;
        }
        else{
            return false;
        }

    }
}
