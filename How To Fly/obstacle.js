const obstaclesArray=[];

class Obstacle{
    constructor(){
        this.top=(Math.random() * canvas.height/3) + 30;
        this.bottom=(Math.random() * canvas.height/3) + 30;
        this.x=canvas.width;
        this.width=30;
        this.color ='brown';//'hsla('+ hue + ',70%, 30%, 2)';
        this.counted=false;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, 0, this.width +20, this.top);
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width+20, this.bottom);
    }
    update(){
        this.x -= gamespeed;
        if(!this.counted && this.x < bird.x){
            score++;
            this.counted=true;
        }
        this.draw();
    }
}
function handleObstacle(){
    if(frame%100===0){
        obstaclesArray.unshift(new Obstacle);
    }
    for(let i=0; i< obstaclesArray.length; i++){
        obstaclesArray[i].update();
    }
    if(obstaclesArray.length > 30){
        obstaclesArray.pop(obstaclesArray[0]);
    }
}