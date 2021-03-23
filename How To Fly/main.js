const canvas=document.getElementById('canvas1');
const ctx=canvas.getContext('2d');
canvas.width=600;
canvas.height=400;
let current_highscore=localStorage.getItem('F_highscore');
let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 4;

const background=new Image();
background.src='BG1.png';
const BG={
    x1: 0, 
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}
function handleBackground() {
    if(BG.x1 <= -BG.width + gamespeed) BG.x1 = BG.width;
    else BG.x1 -= gamespeed;
    if(BG.x2 <= -BG.width + gamespeed) BG.x2 = BG.width;
    else (BG.x2 -= gamespeed);
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);    
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBackground();
    handleObstacle();
    bird.update();
    bird.draw();
    ctx.font="25px Arial Black";
    ctx.fillStyle = "#d4af37";
    ctx.strokeText(score,450,70);
    ctx.fillText('Score:'+score,450,70);
    ctx.fillText('Highscore:'+current_highscore,20,70);
    handleCollisions();
    if(handleCollisions()) return;
    handleParticle();
    if(score>current_highscore)
                    localStorage.setItem('F_highscore',score);
    requestAnimationFrame(animate);
    angle +=0.12 ;
    hue++;
    frame++;
}
animate();

window.addEventListener('keydown', function(e){
    if(e.code==='Space') spacePressed = true;
});
window.addEventListener('keyup', function(e){
    if(e.code==='Space') spacePressed=false;
    bird.framex=0;
});

const bang = new Image();
bang.src='blood.png';
function handleCollisions() {
    for(let i=0; i < obstaclesArray.length; i++){
        if(bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
            bird.x + bird.width > obstaclesArray[i].x &&
            ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0)||
            (bird.y > canvas.height - obstaclesArray[i].bottom &&
                bird.y + bird.height < canvas.height))){
                    ctx.drawImage(bang, bird.x, bird.y-10, 100,50);
                    ctx.font="20px Arial Black";
                    ctx.fillStyle = 'black';
                    ctx.fillText('Game Over, your score is '+ score,160, canvas.height/2 -10);
                    ctx.fillStyle = 'red';
                    ctx.fillText('Tap Enter to Retry',160,canvas.height/2 +20);
                    window.addEventListener('keydown', function(e){
                    if(e.code==='Enter') {spacePressed = false;location.reload();}
                    });
                    if(score>current_highscore){
                        localStorage.setItem('F_highscore',score);
                        ctx.font="30px Arial Black";
                        ctx.fillStyle = "#d4af37";
                        ctx.fillText('New Highscore',160,canvas.height/2-30);
                    }
                   
                    return true;
                }
    }
}

