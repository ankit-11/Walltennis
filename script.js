
var canvas, canvasContext, i=0, ballX=10, ballY=10;
var fps=60;
var ballSpeedX=6, ballSpeedY=8;
var X,Y,width,height,colorP,r;

var paddle1Y;
var paddleSpeed= 4;
const paddleHeight=100;

var score=0, highScore=0;

function findMousePosi(evt){
    var rect= canvas.getBoundingClientRect();
    var root= document.documentElement;
    var mouseX= evt.clientX - rect.left - root.scrollLeft;
    var mouseY= evt.clientY - rect.top - root.scrollTop;
    return{
        x: mouseX,
        y: mouseY
    };


}


window.onload = function(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    
    setInterval(function(){
            draw();    
            canvasContext.drawImage(imge,6,paddle1Y,75,paddleHeight);
    }
    ,1000/fps);
    var imge = document.getElementById('goalie');

    canvas.addEventListener('mousemove',
    function(evt){var mousePos =findMousePosi(evt);
        paddle1Y = mousePos.y - paddleHeight/2;
     }
     );

}


function move(){
    if(ballX > (canvas.width-10)){
        ballSpeedX = -ballSpeedX;
    } 
    if(ballX < 70){
        if((ballY > paddle1Y) &&(ballY < (paddle1Y+paddleHeight))){
            ballSpeedX = -ballSpeedX;
            score++;
            var dY;
        dY = ballY - (paddle1Y + paddleHeight/2);
        ballSpeedY = dY * 0.25;
        }
        else{
            if(highScore < score){
                    highScore = score;
            }
            ballReset();
        }
    }
    
    if((ballY > (canvas.height-10)) || (ballY < 10)){
        ballSpeedY = -ballSpeedY;
    }

    ballX += ballSpeedX;
    ballY +=ballSpeedY;
    
}

function draw(){
    i++;
    
    console.log('Draw '+i+' times');
    //BOX
    drawRect(0,0,canvas.width, canvas.height, 'black');
    
    //PADLLE1
    drawRect(6,paddle1Y,5,paddleHeight,'white');

    //BALL
    drawCircle(ballX,ballY,8,'yellow');
    move();

    canvasContext.font = "30px Arial";
    canvasContext.fillText("Saves: "+score,100,50);
    canvasContext.fillText("High Score: "+highScore,800,50);
    
}

function drawRect(X,Y,width,height,colorP){
    canvasContext.fillStyle= colorP;
    canvasContext.fillRect(X,Y,width,height);
}

function drawCircle(X,Y,r,colorP){
    canvasContext.fillStyle = colorP;
    canvasContext.beginPath();
    canvasContext.arc(X,Y,r,0,Math.PI*2, true);
    canvasContext.fill();
}

function ballReset(){
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    score = 0;
}